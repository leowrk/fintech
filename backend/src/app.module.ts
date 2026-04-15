import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ApplicationsModule } from './applications/applications.module';
import { FilesModule } from './files/files.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Railway y otros proveedores exponen DATABASE_URL
        const databaseUrl = config.get<string>('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            synchronize: true,
            logging: false,
            autoLoadEntities: true,
            ssl: { rejectUnauthorized: false },
          };
        }
        // Variables individuales (local / Docker)
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.get<string>('DB_USERNAME', 'postgres'),
          password: config.get<string>('DB_PASSWORD', 'postgres'),
          database: config.get<string>('DB_DATABASE', 'fintech_db'),
          synchronize: true,
          logging: config.get<string>('NODE_ENV') === 'development',
          autoLoadEntities: true,
          ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    AuthModule,
    ProductsModule,
    ApplicationsModule,
    FilesModule,
    NotificationsModule,
    AuditModule,
    AdminModule,
  ],
})
export class AppModule {}
