import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/user-create.dto';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService,
  ) { }

  @Post('register')
  createNewUser(@Body() body: CreateUserDTO) {
    if (!this.userService.validationUser(body.username, body.password)) {
      throw new BadRequestException('Invalid username or password.')
    }

    return this.userService.createNewUser(body);
  }

}
