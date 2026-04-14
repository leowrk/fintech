import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File, FileType } from './entities/file.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async saveFile(
    multerFile: Express.Multer.File,
    options: {
      fileType?: string;
      userId?: string;
      applicationId?: string;
      description?: string;
    } = {},
  ): Promise<File> {
    const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 3001}`;
    const url = `${baseUrl}/uploads/${multerFile.filename}`;

    const file = this.fileRepository.create({
      originalName: multerFile.originalname,
      filename: multerFile.filename,
      path: multerFile.path,
      mimeType: multerFile.mimetype,
      size: multerFile.size,
      fileType: options.fileType || FileType.OTHER,
      userId: options.userId,
      applicationId: options.applicationId,
      description: options.description,
      url,
    });

    return this.fileRepository.save(file);
  }

  async findByApplication(applicationId: string): Promise<File[]> {
    return this.fileRepository.find({ where: { applicationId } });
  }

  async remove(id: string, userId?: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) throw new NotFoundException(`Archivo ${id} no encontrado`);

    // Borrar del disco
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    await this.fileRepository.remove(file);
  }
}
