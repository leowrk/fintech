import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true, length: 20, unique: true })
  documentNumber: string;

  @Column({ nullable: true, length: 20 })
  cellPhone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helpers
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
