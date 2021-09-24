import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/user-create.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { Request } from 'express';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  @Post('register')
  createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.createNewUser(body);
  }

  @Post('/auth/login')
  async signinLocal(
    @Body('username') username: string,
    @Body('password') password: string,
    @Req() req: Request) {

    const user = await this.userService.getUser(username);

    if (!user) {
      throw new BadRequestException('Username or password incorrect.');
    }

    if (!await bcryptjs.compare(password, user.password)) {
      throw new BadRequestException('Username or password incorrect.');
    }

    const payLoad = {
      id: user.id,
      username,
      email: user.email
    };

    const accessToken = await this.jwtService.signAsync(payLoad, { expiresIn: '30s' });

    req.headers.authorization = `Bearer ${accessToken}`;

    console.log(req.headers);

    return accessToken;
  }

}
