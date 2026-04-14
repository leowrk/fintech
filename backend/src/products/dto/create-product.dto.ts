import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsObject,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'MacBook Air M1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Laptop ultraligera ideal para estudiantes', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Laptops' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Apple', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'MacBook Air M1', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ example: { processor: 'Apple M1', ram: '8GB' }, required: false })
  @IsOptional()
  @IsObject()
  specs?: Record<string, any>;

  @ApiProperty({ example: 'https://...', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
