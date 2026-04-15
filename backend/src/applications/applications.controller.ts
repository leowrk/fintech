import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './services/applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Crear solicitud — requiere autenticación
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear solicitud de financiamiento' })
  create(@Body() dto: CreateApplicationDto, @Request() req: any) {
    return this.applicationsService.create(dto, req.user.id);
  }

  // Ver mis solicitudes (requiere auth)
  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mis solicitudes' })
  myApplications(@Request() req: any) {
    // Pasar userId + email + documentNumber para recuperar también solicitudes antiguas
    return this.applicationsService.findByUser(
      req.user.id,
      req.user.email,
      req.user.documentNumber,
    );
  }

  // Calcular cuota simulada
  @Get('simulate')
  @ApiOperation({ summary: 'Simular cuota mensual' })
  simulate(
    @Query('price') price: number,
    @Query('term') term: number,
    @Query('rate') rate?: number,
  ) {
    const monthly = this.applicationsService.calculatePayment(
      Number(price),
      Number(term),
      rate ? Number(rate) / 100 : 0.019,
    );
    return { price, term, monthlyPayment: Math.round(monthly * 100) / 100 };
  }
}
