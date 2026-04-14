import { Injectable, Logger } from '@nestjs/common';

interface AuditLogEntry {
  entityType: string;
  entityId?: string;
  action: string;
  userId?: string;
  details?: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  async log(entry: AuditLogEntry): Promise<void> {
    this.logger.log(
      `[AUDIT] ${entry.action} on ${entry.entityType}${entry.entityId ? `:${entry.entityId}` : ''} by ${entry.userId || 'anonymous'} — ${entry.details || ''}`,
    );
    // TODO: persistir en tabla audit_logs cuando se requiera auditoría completa
  }
}
