import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { File } from '../../files/entities/file.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum DocumentType {
  DNI = 'DNI',
  CE = 'CE',
}

export enum HousingType {
  OWN = 'own',
  RENT = 'rent',
  FAMILY = 'family',
}

export enum IncomeSource {
  EMPLOYEE = 'employee',
  BUSINESS = 'business',
  INDEPENDENT = 'independent',
  FAMILY_SUPPORT = 'family_support',
  SCHOLARSHIP = 'scholarship',
}

@Entity('applications')
@Index(['status', 'createdAt'])
@Index(['userId', 'status'])
@Index(['documentNumber', 'status'])
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === PRODUCTO ===
  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productPrice: number;

  // === DATOS PERSONALES ===
  @Column({ type: 'varchar', length: 10, default: 'DNI' })
  documentType: string;

  @Column({ type: 'varchar', length: 20 })
  documentNumber: string;

  @Column({ type: 'varchar', length: 20 })
  cellPhone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text', nullable: true })
  homeAddress: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  housingType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rentAmount: number;

  // Datos personales adicionales almacenados en JSON
  @Column({ type: 'jsonb', nullable: true, default: {} })
  personalData: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
  };

  // === INFORMACIÓN ACADÉMICA ===
  @Column({ type: 'varchar', length: 100, nullable: true })
  educationalInstitution: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  studyCycle: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pension: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  career: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  otherCareer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  studentCode: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pensionPaymentMethod: string;

  // === FUENTE DE INGRESOS ===
  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  incomeSource: string;

  // Datos financieros adicionales
  @Column({ type: 'jsonb', nullable: true, default: {} })
  financialData: {
    jobTitle?: string;
    employerName?: string;
    employerPhone?: string;
    monthlyIncome?: number;
    hasRUC?: string;
    rucNumber?: string;
    moneyReceivingMethod?: string;
    businessType?: string;
    supporterName?: string;
    supporterRelationship?: string;
    supporterIncome?: number;
  };

  // === CONFIRMACIÓN ===
  @Column({ type: 'varchar', length: 255, nullable: true })
  howYouFoundUs: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  discountCoupon: string;

  @Column({ type: 'boolean', default: false })
  acceptsTerms: boolean;

  // === ESTADO ===
  @Column({
    type: 'varchar',
    length: 20,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // === DATOS DE APROBACIÓN ===
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  approvedAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyPayment: number;

  @Column({ type: 'integer', nullable: true })
  paymentTerm: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true })
  interestRate: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  approvedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  rejectedAt: Date;

  // Historial de cambios de estado
  @Column({ type: 'jsonb', nullable: true, default: [] })
  decisionHistory: Array<{
    action: string;
    actor: string;
    timestamp: Date;
    notes?: string;
    previousStatus?: string;
    newStatus?: string;
  }>;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // === RELACIONES ===
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => File, (file) => file.application, { nullable: true })
  files: File[];
}
