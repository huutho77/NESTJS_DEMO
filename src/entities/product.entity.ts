import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
}
