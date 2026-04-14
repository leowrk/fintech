import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from '../../applications/services/applications.service';
import { ApplicationFilterDto } from '../../applications/dto/application-filter.dto';
import { UpdateApplicationDto } from '../../applications/dto/update-application.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('admin/applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin/applications')
export class AdminApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  findAll(@Query() filterDto: ApplicationFilterDto) {
    return this.applicationsService.findAll(filterDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estadísticas del dashboard' })
  getStats() {
    return this.applicationsService.getDashboardStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de solicitud' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cambiar estado de solicitud (aprobar/rechazar/revisar)' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationDto,
    @Request() req: any,
  ) {
    return this.applicationsService.updateStatus(id, dto, req.user.id);
  }
}
