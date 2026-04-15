import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CheckDniDto {
  @ApiProperty({ example: '72345678' })
  @IsString()
  @Length(7, 20)
  documentNumber: string;
}
