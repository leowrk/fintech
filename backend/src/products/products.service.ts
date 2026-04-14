import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(query: {
    category?: string;
    search?: string;
    featured?: boolean;
    available?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { category, search, featured, available, page = 1, limit = 20 } = query;

    const where: any = {};
    if (category) where.category = category;
    if (featured !== undefined) where.isFeatured = featured;
    if (available !== undefined) where.isAvailable = available;

    const options: FindManyOptions<Product> = {
      where,
      order: { isFeatured: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    };

    const [items, total] = await this.productRepository.findAndCount(options);

    // Filter by search term (simplified — full-text search would use query builder)
    const filtered = search
      ? items.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand?.toLowerCase().includes(search.toLowerCase()),
        )
      : items;

    return {
      items: filtered,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Producto ${id} no encontrado`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.isAvailable = true')
      .getRawMany();
    return result.map((r) => r.category);
  }
}
