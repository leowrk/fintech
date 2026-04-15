/**
 * Seed de base de datos — productos de ejemplo + admin inicial
 * Ejecutar con: npx ts-node -r tsconfig-paths/register src/database/seed.ts
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../auth/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { SystemSettings } from '../auth/entities/system-settings.entity';
import * as dotenv from 'dotenv';

dotenv.config();

// Soporta DATABASE_URL (Railway) o variables individuales (local/Docker)
const databaseUrl = process.env.DATABASE_URL;

const AppDataSource = databaseUrl
  ? new DataSource({
      type: 'postgres',
      url: databaseUrl,
      synchronize: true,
      entities: [User, Product, SystemSettings],
      ssl: { rejectUnauthorized: false },
    })
  : new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'fintech_db',
      synchronize: true,
      entities: [User, Product, SystemSettings],
    });

async function seed() {
  await AppDataSource.initialize();
  console.log('✅ Conectado a la base de datos');

  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  // ─── ADMIN ──────────────────────────────────────────────────────────────────
  const adminEmail = 'admin@fintech.edu.pe';
  const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash('Admin123!', 10);
    const admin = userRepo.create({
      email: adminEmail,
      password: hashed,
      firstName: 'Admin',
      lastName: 'Fintech',
      isAdmin: true,
    });
    await userRepo.save(admin);
    console.log(`✅ Admin creado: ${adminEmail} / Admin123!`);
  } else {
    console.log('ℹ️  Admin ya existe, omitiendo');
  }

  // ─── PRODUCTOS ───────────────────────────────────────────────────────────────
  const existingProducts = await productRepo.count();
  if (existingProducts > 0) {
    console.log(`ℹ️  Ya existen ${existingProducts} productos, omitiendo seed`);
    await AppDataSource.destroy();
    return;
  }

  const products = [
    {
      name: 'MacBook Air M1',
      description: 'Portátil ultraligero con chip M1. Perfecto para diseño y programación.',
      price: 3500,
      category: 'Laptops',
      brand: 'Apple',
      model: 'MacBook Air M1',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      isAvailable: true,
      isFeatured: true,
      stock: 8,
      specs: {
        processor: 'Apple M1',
        ram: '8GB',
        storage: '256GB SSD',
        screen: '13.3" Retina',
        battery: '18h',
        os: 'macOS Ventura',
      },
    },
    {
      name: 'Lenovo Legion 5',
      description: 'Laptop gaming de alto rendimiento con gráficos dedicados.',
      price: 4200,
      category: 'Gaming',
      brand: 'Lenovo',
      model: 'Legion 5 Gen 6',
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b5e239b?w=800&q=80',
      isAvailable: true,
      isFeatured: true,
      stock: 5,
      specs: {
        processor: 'AMD Ryzen 7 5800H',
        ram: '16GB DDR4',
        storage: '512GB NVMe SSD',
        screen: '15.6" FHD 144Hz',
        graphics: 'NVIDIA RTX 3060 6GB',
        os: 'Windows 11',
      },
    },
    {
      name: 'iPad Air 5',
      description: 'Tablet versátil con chip M1. Ideal para notas y presentaciones.',
      price: 2800,
      category: 'Tablets',
      brand: 'Apple',
      model: 'iPad Air 5th Gen',
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      isAvailable: true,
      isFeatured: false,
      stock: 12,
      specs: {
        processor: 'Apple M1',
        ram: '8GB',
        storage: '256GB',
        screen: '10.9" Liquid Retina',
        battery: '10h',
        connectivity: 'Wi-Fi 6, USB-C',
      },
    },
    {
      name: 'Acer Nitro 5',
      description: 'Laptop gaming económica con buen rendimiento para estudiantes.',
      price: 3100,
      category: 'Gaming',
      brand: 'Acer',
      model: 'Nitro 5 AN515',
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b5e239b?w=800&q=80',
      isAvailable: true,
      isFeatured: false,
      stock: 7,
      specs: {
        processor: 'Intel Core i5-11400H',
        ram: '8GB DDR4',
        storage: '512GB NVMe SSD',
        screen: '15.6" FHD 144Hz',
        graphics: 'NVIDIA RTX 3050 4GB',
        os: 'Windows 11',
      },
    },
    {
      name: 'Samsung Tab S8',
      description: 'Tablet premium con pantalla AMOLED y soporte para S Pen.',
      price: 3000,
      category: 'Tablets',
      brand: 'Samsung',
      model: 'Galaxy Tab S8',
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
      isAvailable: true,
      isFeatured: false,
      stock: 10,
      specs: {
        processor: 'Snapdragon 8 Gen 1',
        ram: '8GB',
        storage: '256GB',
        screen: '11" AMOLED 120Hz',
        battery: '8000mAh',
        connectivity: 'Wi-Fi 6E, USB-C',
      },
    },
    {
      name: 'Dell XPS 13',
      description: 'Ultrabook premium para profesionales. Pantalla InfinityEdge.',
      price: 4800,
      category: 'Laptops',
      brand: 'Dell',
      model: 'XPS 13 9310',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      isAvailable: true,
      isFeatured: true,
      stock: 4,
      specs: {
        processor: 'Intel Core i7-1165G7',
        ram: '16GB LPDDR4x',
        storage: '512GB NVMe SSD',
        screen: '13.4" FHD+ InfinityEdge',
        graphics: 'Intel Iris Xe',
        os: 'Windows 11 Pro',
      },
    },
    {
      name: 'Asus VivoBook 15',
      description: 'Laptop versátil y económica para estudiantes de todas las carreras.',
      price: 2200,
      category: 'Laptops',
      brand: 'Asus',
      model: 'VivoBook 15 X513',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      isAvailable: true,
      isFeatured: false,
      stock: 15,
      specs: {
        processor: 'Intel Core i5-1135G7',
        ram: '8GB DDR4',
        storage: '256GB SSD',
        screen: '15.6" FHD',
        battery: '6h',
        os: 'Windows 11 Home',
      },
    },
    {
      name: 'HP Pavilion 14',
      description: 'Laptop delgada y ligera ideal para estudiantes en movimiento.',
      price: 2600,
      category: 'Laptops',
      brand: 'HP',
      model: 'Pavilion 14-dv0',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      isAvailable: true,
      isFeatured: false,
      stock: 9,
      specs: {
        processor: 'Intel Core i5-1135G7',
        ram: '8GB DDR4',
        storage: '512GB SSD',
        screen: '14" FHD IPS',
        battery: '8h',
        os: 'Windows 11',
      },
    },
  ];

  for (const p of products) {
    const product = productRepo.create(p);
    await productRepo.save(product);
    console.log(`✅ Producto creado: ${p.name}`);
  }

  console.log('\n🎉 Seed completado exitosamente');
  console.log('🔑 Admin login: admin@fintech.edu.pe / Admin123!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
