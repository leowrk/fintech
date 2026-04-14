import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateApplicationDto {
  // Producto
  @ApiProperty({ example: 'uuid-del-producto', required: false })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ example: 'MacBook Air M1' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  @Min(0)
  productPrice: number;

  // Datos personales
  @ApiProperty({ example: 'DNI', required: false })
  @IsOptional()
  @IsString()
  documentType?: string;

  @ApiProperty({ example: '72345678' })
  @IsString()
  documentNumber: string;

  @ApiProperty({ example: '987654321' })
  @IsString()
  cellPhone: string;

  @ApiProperty({ example: 'juan@senati.pe' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  homeAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'own', required: false })
  @IsOptional()
  @IsString()
  housingType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  rentAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  personalData?: { firstName?: string; lastName?: string; birthDate?: string };

  // Datos académicos
  @ApiProperty({ example: 'senati', required: false })
  @IsOptional()
  @IsString()
  educationalInstitution?: string;

  @ApiProperty({ example: '3', required: false })
  @IsOptional()
  @IsString()
  studyCycle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pension?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  career?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  otherCareer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  studentCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pensionPaymentMethod?: string;

  // Fuente de ingresos
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ example: 'employee', required: false })
  @IsOptional()
  @IsString()
  incomeSource?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  financialData?: Record<string, any>;

  // Confirmación
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  howYouFoundUs?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  discountCoupon?: string;

  @ApiProperty({ default: false, required: false })
  @IsOptional()
  @IsBoolean()
  acceptsTerms?: boolean;
}
