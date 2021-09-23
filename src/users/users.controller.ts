import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/user-create.dto';
import { Request } from 'express';
import { AuthDTO } from 'src/dto/auth.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Post('register')
  createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.createNewUser(body);
  }

  @Post('/auth/login')
  signinLocal(@Body() body: AuthDTO) {
    return this.userService.signinLocal(body);
  }

}
