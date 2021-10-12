import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/user-create.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDTO } from '../dto/user-update.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async createNewUser(newUser: CreateUserDTO): Promise<User> {
    let { username, password, firstname, lastname, address, phone_number, email } = newUser;

    if (await this.checkExist(username)) {
      throw new ConflictException('Username already exist.');
    }

    // Hash password before insert into database.
    let saltOrRounds = await bcryptjs.genSalt(12);
    let hashPassword = await bcryptjs.hash(password, saltOrRounds);

    let user = this.userRepository.create({
      id: uuidv4(),
      username,
      password: hashPassword,
      firstname,
      lastname,
      address,
      phone_number,
      email,
      create_At: new Date(),
      update_At: new Date()
    });

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
    let result = true;
    if (!username || !password) {
      result = false;
    } else if (username.length < 6 || password.length < 8) {
      result = false;
    }
    return result;
  }

  async updateUser(userId: string, valueChange: UpdateUserDTO): Promise<User> {
    let user = await this.userRepository.findOne({ id: userId });

    console.log(user);
    console.log(valueChange);

    return null;
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    let user = await this.userRepository.findOne(id);

    // check exist of user
    if (!user) { throw new NotFoundException('Username is incorrect.'); }

    if (await bcryptjs.compare(newPassword, user.password)) {
      throw new BadRequestException('Password cannot be the same as the current password');
    }

    // Generate hash password for User
    let saltOrRounds = await bcryptjs.genSalt(12);
    let hashPassword = await bcryptjs.hash(newPassword, saltOrRounds);

    await this.userRepository.update(id, { password: hashPassword });

    return user;
  }

}
