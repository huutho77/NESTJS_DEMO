import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { async, throwError } from 'rxjs';
import { CreateUserDTO } from 'src/dto/user-create.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createNewUser(newUser: CreateUserDTO): Promise<User> {

    if (await this.checkUserExist(newUser.username)) {
      throw new ConflictException();
    }

    let user: User = this.userRepository.create(newUser);

    user.id = randomUUID();
    user.create_At = new Date();
    user.update_At = new Date();

    console.log(user);

    return this.userRepository.save(user);
  }

  private async checkUserExist(username: string): Promise<boolean> {
    let user: User = await this.userRepository.findOne({ username });

    if (user) {
      return true;
    } else {
      return false;
    }
  }

}
