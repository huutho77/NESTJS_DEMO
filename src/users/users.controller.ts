import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('login')
  loginUser(@Body() body) {
    console.log('This is body ---> ', body);

    this.userService.authenticate(body);
  }

}
