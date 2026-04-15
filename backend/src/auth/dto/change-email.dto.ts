import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty({ example: 'Password123!' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'nuevo@fintech.edu.pe' })
  @IsEmail()
  newEmail: string;
}
