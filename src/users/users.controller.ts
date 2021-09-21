import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/user-create.dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Post('register')
  createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.createNewUser(body);
  }

}
