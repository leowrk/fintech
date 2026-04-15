import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'Password123!' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'NewPassword456!' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
