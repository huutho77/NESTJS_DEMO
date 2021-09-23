import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from 'src/dto/user-create.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { AuthDTO } from 'src/dto/auth.dto';

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

  private async checkUserExist(username: string): Promise<boolean> {
    let user = await this.userRepository.findOne({ username });

    if (user) { return true; }
    else { return false; }
  }

  async signinLocal(authData: AuthDTO) {
    const user: User = await this.userRepository.findOne({ username: authData.username });

    if (!user) {
      throw new UnauthorizedException('Username or password is wrong..');
    }
    
    let decodePassword = await bcryptjs.compare(authData.password, user.password);

    if (!decodePassword) {
      throw new UnauthorizedException('Username or password is wrong.');
    }

    return user;
  }

}
