import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class LoginDniDto {
  @ApiProperty({ example: '72345678' })
  @IsString()
  @Length(7, 20)
  documentNumber: string;

  @ApiProperty({ example: 'MiClave123' })
  @IsString()
  @MinLength(6)
  password: string;
}
