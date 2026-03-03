import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;

  @CreateDateColumn()
  date!: Date;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products!: Product[];
}
