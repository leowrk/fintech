import { Injectable, Logger } from '@nestjs/common';
import { Application } from '../../applications/entities/application.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async notifyNewApplication(application: Application): Promise<void> {
    this.logger.log(
      `📧 Nueva solicitud recibida: ${application.productName} - DNI: ${application.documentNumber}`,
    );
    // TODO: implementar envío por email con Nodemailer/Resend
  }

  async notifyStatusChange(application: Application): Promise<void> {
    this.logger.log(
      `📧 Solicitud ${application.id} cambió a estado: ${application.status}`,
    );
    // TODO: notificar al solicitante por email
  }
}
