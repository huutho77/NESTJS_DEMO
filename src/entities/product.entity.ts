import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, default: '' })
  name: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'datetime', nullable: true })
  create_At: Date;

  @Column({ type: 'datetime', nullable: true })
  update_At: Date;

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}
