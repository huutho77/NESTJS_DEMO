import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from 'src/dto/user-create.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDTO } from 'src/dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async createNewUser(newUser: CreateUserDTO): Promise<User> {
    if (await this.checkExist(newUser.username)) {
      throw new ConflictException('Username already exist.');
    }

    let user = this.userRepository.create(newUser);

    // Hash password before insert into database.
    let saltOrRounds = await bcryptjs.genSalt(12);
    let hashPassword = await bcryptjs.hash(newUser.password, saltOrRounds);

    user.id = randomUUID();
    user.password = hashPassword;
    user.create_At = new Date();
    user.update_At = new Date();

    return this.userRepository.save(user);
  }

  async checkExist(username: string): Promise<boolean> {
    let user = await this.userRepository.findOne({ username });
    return user ? true : false;
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  validationUser(username: string, password: string): boolean {
    if (!username && !password) { return false; }

    if (username.length < 6 || password.length < 8) { return false }

    return true;
  }

  async updateUser(userId: string, userChange: UpdateUserDTO): Promise<User> {
    let userUpdate = await this.userRepository.findOne({ id: userId });

    console.log(userUpdate);
    console.log(userChange);

    return null;
  }

  async updatePassword(): Promise<User> {

    return null;
  }

}
