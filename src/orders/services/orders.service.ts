import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOneBy({
      id: createOrderDto.userId,
    });
    if (!user)
      throw new NotFoundException(`User #${createOrderDto.userId} not found`);

    const skus: string[] = createOrderDto.productSkus;
    const products = await this.productsRepository.findBy({ sku: In(skus) });
    const total = products.reduce((sum, p) => sum + Number(p.price), 0);
    const order = new Order();
    order.user = user;
    order.total = total;
    order.products = products;
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.ordersRepository.delete(id);
  }
}
