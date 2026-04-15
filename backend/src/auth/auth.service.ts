import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { SystemSettings } from './entities/system-settings.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CheckDniDto } from './dto/check-dni.dto';
import { LoginDniDto } from './dto/login-dni.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeEmailDto } from './dto/change-email.dto';

// Defaults para configuración del sistema
const DEFAULTS: Record<string, string> = {
  admin_session_duration: '8',   // horas
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SystemSettings)
    private settingsRepository: Repository<SystemSettings>,
    private jwtService: JwtService,
  ) {}

  // ── Configuración del sistema ─────────────────────────────────────────────
  async getSetting(key: string): Promise<string> {
    const row = await this.settingsRepository.findOne({ where: { key } });
    return row?.value ?? DEFAULTS[key] ?? '';
  }

  async getSettings(): Promise<Record<string, string>> {
    const rows = await this.settingsRepository.find();
    const result: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) {
      result[row.key] = row.value;
    }
    return result;
  }

  async updateSetting(key: string, value: string, description?: string): Promise<void> {
    await this.settingsRepository.upsert(
      { key, value, description },
      ['key'],
    );
  }

  // ── Login por email ───────────────────────────────────────────────────────
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'isAdmin', 'documentNumber'],
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

    const token = await this.generateToken(user);
    return { access_token: token, user: this.formatUser(user) };
  }

  // ── Login por DNI ─────────────────────────────────────────────────────────
  async loginByDni(dto: LoginDniDto) {
    const user = await this.userRepository.findOne({
      where: { documentNumber: dto.documentNumber },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'isAdmin', 'documentNumber'],
    });

    if (!user) throw new UnauthorizedException('No existe cuenta para este DNI');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta');

    const token = await this.generateToken(user);
    return { access_token: token, user: this.formatUser(user) };
  }

  // ── Verificar si DNI ya tiene cuenta ─────────────────────────────────────
  async checkDni(dto: CheckDniDto) {
    const user = await this.userRepository.findOne({
      where: { documentNumber: dto.documentNumber },
    });
    return {
      exists: !!user,
      firstName: user?.firstName || null,
    };
  }

  // ── Registro ──────────────────────────────────────────────────────────────
  async register(registerDto: RegisterDto) {
    if (registerDto.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: registerDto.email },
      });
      if (emailExists) throw new ConflictException('El correo ya está registrado');
    }

    if (registerDto.documentNumber) {
      const dniExists = await this.userRepository.findOne({
        where: { documentNumber: registerDto.documentNumber },
      });
      if (dniExists) throw new ConflictException('Este DNI ya tiene una cuenta registrada');
    }

    const hashed = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      ...registerDto,
      firstName: registerDto.firstName || '',
      lastName: registerDto.lastName || '',
      password: hashed,
      isAdmin: false,
    });

    await this.userRepository.save(user);
    const token = await this.generateToken(user);
    return { access_token: token, user: this.formatUser(user) };
  }

  // ── Cambiar contraseña ────────────────────────────────────────────────────
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'isAdmin', 'documentNumber'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isValid) throw new UnauthorizedException('La contraseña actual es incorrecta');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.update(userId, { password: hashed });

    // Devolver nuevo token para que la sesión continúe
    const token = await this.generateToken(user);
    return { message: 'Contraseña actualizada correctamente', access_token: token };
  }

  // ── Cambiar email ─────────────────────────────────────────────────────────
  async changeEmail(userId: string, dto: ChangeEmailDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'isAdmin', 'documentNumber'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isValid) throw new UnauthorizedException('La contraseña actual es incorrecta');

    const emailTaken = await this.userRepository.findOne({ where: { email: dto.newEmail } });
    if (emailTaken) throw new ConflictException('Este correo ya está en uso');

    await this.userRepository.update(userId, { email: dto.newEmail });
    user.email = dto.newEmail;

    const token = await this.generateToken(user);
    const formatted = this.formatUser(user);
    return { message: 'Correo actualizado correctamente', access_token: token, user: formatted };
  }

  // ── Perfil ────────────────────────────────────────────────────────────────
  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };

    if (user.isAdmin) {
      const hoursStr = await this.getSetting('admin_session_duration');
      const hours = parseFloat(hoursStr) || 8;
      return this.jwtService.sign(payload, { expiresIn: `${hours}h` });
    }

    return this.jwtService.sign(payload); // usa el default del módulo (7d)
  }

  private formatUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      documentNumber: user.documentNumber,
    };
  }
}
