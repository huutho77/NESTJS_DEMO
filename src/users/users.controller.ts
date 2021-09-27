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

  @Post('/auth/login')
  async signinLocal(
    @Body('username') username: string,
    @Body('password') password: string) {

    if (!await this.userService.checkExist(username)) {
      throw new BadRequestException('Username or password incorrect.');
    }

    const accessToken = await this.userService.signinLocal(username, password);

    return accessToken;
  }

}
