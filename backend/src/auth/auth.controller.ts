import { Controller, Post, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CheckDniDto } from './dto/check-dni.dto';
import { LoginDniDto } from './dto/login-dni.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login con email y contraseña' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login-dni')
  @ApiOperation({ summary: 'Login con DNI y contraseña' })
  loginByDni(@Body() dto: LoginDniDto) {
    return this.authService.loginByDni(dto);
  }

  @Post('check-dni')
  @ApiOperation({ summary: 'Verifica si un DNI ya tiene cuenta' })
  checkDni(@Body() dto: CheckDniDto) {
    return this.authService.checkDni(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil del usuario autenticado' })
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar contraseña' })
  changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, dto);
  }

  @Patch('change-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar correo electrónico' })
  changeEmail(@Request() req: any, @Body() dto: ChangeEmailDto) {
    return this.authService.changeEmail(req.user.id, dto);
  }
}
