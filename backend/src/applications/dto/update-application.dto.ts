import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApplicationStatus } from '../entities/application.entity';

export class UpdateApplicationDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  monthlyPayment?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  paymentTerm?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  interestRate?: number;
}
