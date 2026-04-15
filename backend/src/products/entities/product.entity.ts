import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  specs: Record<string, any>;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'int', default: 0 })
  stock: number;

  // ── Campos financieros ───────────────────────────────────────────────────────

  /** Tasa de interés mensual (ej: 0.019 = 1.9%) */
  @Column({ type: 'decimal', precision: 6, scale: 4, default: 0.019 })
  interestRate: number;

  /** Plazos disponibles en meses (ej: [6, 12, 18, 24]) */
  @Column({ type: 'jsonb', default: [6, 12, 18, 24] })
  paymentTerms: number[];

  /** Cuota inicial mínima en porcentaje (ej: 10 = 10%) */
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  minDownPayment: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
