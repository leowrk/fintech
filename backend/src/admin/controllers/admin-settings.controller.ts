import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthService } from '../../auth/auth.service';
import { IsString, IsIn, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateSettingsDto {
  @ApiProperty({ example: '8' })
  @IsNumberString()
  adminSessionDuration: string; // en horas
}

@ApiTags('admin-settings')
@Controller('admin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class AdminSettingsController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener configuración del sistema' })
  async getSettings() {
    const settings = await this.authService.getSettings();
    return {
      adminSessionDuration: settings['admin_session_duration'] ?? '8',
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Actualizar configuración del sistema' })
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    if (dto.adminSessionDuration !== undefined) {
      await this.authService.updateSetting(
        'admin_session_duration',
        dto.adminSessionDuration,
        'Duración de la sesión de administrador en horas',
      );
    }
    return { message: 'Configuración actualizada. Aplica en el próximo inicio de sesión.' };
  }
}
