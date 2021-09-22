import { type } from "os";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  create_At: Date;
  
  @Column()
  updatee_At: Date;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}