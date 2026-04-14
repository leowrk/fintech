import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Application } from '../../applications/entities/application.entity';

export enum FileType {
  DNI = 'dni',
  ENROLLMENT = 'enrollment',
  PAYMENT_PROOF = 'payment_proof',
  PRODUCT_IMAGE = 'product_image',
  OTHER = 'other',
}

export enum FileStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  filename: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar', length: 50, default: FileType.OTHER })
  fileType: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20, default: FileStatus.PENDING })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  applicationId: string;

  @ManyToOne(() => Application, (app) => app.files, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;
}
