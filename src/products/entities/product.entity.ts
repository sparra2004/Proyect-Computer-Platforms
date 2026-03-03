import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  sku!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @ManyToMany(() => Order, (order) => order.products)
  orders!: Order[];
}
