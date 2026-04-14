import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationFilterDto } from '../dto/application-filter.dto';
import { NotificationService } from '../../notifications/services/notification.service';
import { AuditService } from '../../audit/services/audit.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private notificationService: NotificationService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateApplicationDto, userId?: string): Promise<Application> {
    // Evitar duplicados activos del mismo DNI para el mismo producto
    if (dto.documentNumber && dto.productName) {
      const existing = await this.applicationRepository.findOne({
        where: {
          documentNumber: dto.documentNumber,
          productName: dto.productName,
          status: ApplicationStatus.PENDING,
        },
      });
      if (existing) {
        throw new ConflictException(
          'Ya tienes una solicitud pendiente para este producto',
        );
      }
    }

    const application = this.applicationRepository.create({
      ...dto,
      userId: userId || null,
      status: ApplicationStatus.PENDING,
      decisionHistory: [],
    });

    const saved = await this.applicationRepository.save(application);

    // Notificar al admin (no bloqueante)
    this.notificationService.notifyNewApplication(saved).catch(() => null);

    // Auditoría (no bloqueante)
    this.auditService.log({
      entityType: 'Application',
      entityId: saved.id,
      action: 'CREATE',
      userId: userId,
      details: `Nueva solicitud para ${saved.productName}`,
    }).catch(() => null);

    return saved;
  }

  async findAll(filterDto: ApplicationFilterDto) {
    const {
      page = 1,
      limit = 10,
      status,
      educationalInstitution,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = filterDto;

    const qb = this.applicationRepository
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.files', 'files');

    if (status) qb.andWhere('app.status = :status', { status });
    if (educationalInstitution)
      qb.andWhere('app.educationalInstitution = :ei', { ei: educationalInstitution });
    if (search)
      qb.andWhere(
        '(app.email ILIKE :search OR app.documentNumber ILIKE :search OR app.productName ILIKE :search)',
        { search: `%${search}%` },
      );

    const allowedSort = ['createdAt', 'updatedAt', 'productPrice', 'status'];
    const sortField = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
    qb.orderBy(`app.${sortField}`, order);

    const total = await qb.getCount();
    const items = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<Application> {
    const app = await this.applicationRepository.findOne({
      where: { id },
      relations: ['files'],
    });
    if (!app) throw new NotFoundException(`Solicitud ${id} no encontrada`);
    return app;
  }

  async findByUser(userId: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['files'],
    });
  }

  async updateStatus(
    id: string,
    dto: UpdateApplicationDto,
    actorId: string,
  ): Promise<Application> {
    const app = await this.findOne(id);

    this.validateStatusTransition(app.status, dto.status);

    const history = app.decisionHistory || [];
    history.push({
      action: `STATUS_CHANGE`,
      actor: actorId,
      timestamp: new Date(),
      notes: dto.notes,
      previousStatus: app.status,
      newStatus: dto.status,
    });

    if (dto.status === ApplicationStatus.APPROVED) {
      app.approvedAt = new Date();
      if (dto.approvedAmount) app.approvedAmount = dto.approvedAmount;
      if (dto.monthlyPayment) app.monthlyPayment = dto.monthlyPayment;
      if (dto.paymentTerm) app.paymentTerm = dto.paymentTerm;
      if (dto.interestRate) app.interestRate = dto.interestRate;
    }

    if (dto.status === ApplicationStatus.REJECTED) {
      app.rejectedAt = new Date();
      app.rejectionReason = dto.rejectionReason;
    }

    app.status = dto.status;
    app.notes = dto.notes || app.notes;
    app.decisionHistory = history;

    const updated = await this.applicationRepository.save(app);

    this.notificationService.notifyStatusChange(updated).catch(() => null);
    this.auditService.log({
      entityType: 'Application',
      entityId: id,
      action: 'UPDATE_STATUS',
      userId: actorId,
      details: `Estado cambiado a ${dto.status}`,
    }).catch(() => null);

    return updated;
  }

  async getDashboardStats() {
    const [total, pending, underReview, approved, rejected] = await Promise.all([
      this.applicationRepository.count(),
      this.applicationRepository.count({ where: { status: ApplicationStatus.PENDING } }),
      this.applicationRepository.count({ where: { status: ApplicationStatus.UNDER_REVIEW } }),
      this.applicationRepository.count({ where: { status: ApplicationStatus.APPROVED } }),
      this.applicationRepository.count({ where: { status: ApplicationStatus.REJECTED } }),
    ]);

    return { total, pending, underReview, approved, rejected };
  }

  // Calcular cuota mensual (método de anualidades)
  calculatePayment(price: number, termMonths: number, monthlyRate = 0.019) {
    if (monthlyRate === 0) return price / termMonths;
    return (price * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  }

  private validateStatusTransition(current: ApplicationStatus, next: ApplicationStatus) {
    const allowed: Record<string, string[]> = {
      [ApplicationStatus.PENDING]: [
        ApplicationStatus.UNDER_REVIEW,
        ApplicationStatus.APPROVED,
        ApplicationStatus.REJECTED,
        ApplicationStatus.CANCELLED,
      ],
      [ApplicationStatus.UNDER_REVIEW]: [
        ApplicationStatus.APPROVED,
        ApplicationStatus.REJECTED,
        ApplicationStatus.CANCELLED,
      ],
      [ApplicationStatus.APPROVED]: [ApplicationStatus.COMPLETED, ApplicationStatus.CANCELLED],
      [ApplicationStatus.REJECTED]: [ApplicationStatus.PENDING],
      [ApplicationStatus.CANCELLED]: [ApplicationStatus.PENDING],
    };

    if (!allowed[current]?.includes(next)) {
      throw new BadRequestException(`No se puede pasar de "${current}" a "${next}"`);
    }
  }
}
