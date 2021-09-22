import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from 'src/dto/user-create.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async createNewUser(newUser: CreateUserDTO): Promise<User> {
    if (await this.checkUserExist(newUser.username)) {
      throw new ConflictException();
    }

    let user: User = this.userRepository.create(newUser);
    let saltOrRounds = await bcryptjs.genSalt(12);
    let hashPassword = await bcryptjs.hash(newUser.password, saltOrRounds);

    user.id = randomUUID();
    user.password = hashPassword;
    user.create_At = new Date();
    user.update_At = new Date();

    return this.userRepository.save(user);
  }

  async authenticate(queryData: User): Promise<User> {
    let user: User;

    user = await this.userRepository.findOne({ username: queryData.username });

    if (!user) {
      throw new NotFoundException();
    }

    return null;
  }

  private async checkUserExist(username: string): Promise<boolean> {
    let user = await this.userRepository.findOne({ username });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

}
