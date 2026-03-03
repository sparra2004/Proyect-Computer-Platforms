import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const exists: Product | null = await this.productsRepository.findOneBy({
      sku: createProductDto.sku,
    });
    if (exists)
      throw new ConflictException(
        `Product with sku ${createProductDto.sku} already exists`,
      );

    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(sku: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ sku });
    if (!product)
      throw new NotFoundException(`Product with sku ${sku} not found`);
    return product;
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(sku);
    await this.productsRepository.update(sku, updateProductDto);
    return this.findOne(sku);
  }

  async remove(sku: string): Promise<void> {
    await this.findOne(sku);
    await this.productsRepository.delete(sku);
  }
}
