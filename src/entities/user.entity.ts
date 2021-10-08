import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: '' })
  email: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  create_At: Date;

  @Column()
  update_At: Date;
}