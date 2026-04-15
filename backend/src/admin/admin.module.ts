import { Module } from '@nestjs/common';
import { AdminApplicationsController } from './controllers/admin.applications.controller';
import { AdminProductsController } from './controllers/admin.products.controller';
import { AdminSettingsController } from './controllers/admin-settings.controller';
import { ApplicationsModule } from '../applications/applications.module';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ApplicationsModule, ProductsModule, AuthModule],
  controllers: [
    AdminApplicationsController,
    AdminProductsController,
    AdminSettingsController,
  ],
})
export class AdminModule {}
