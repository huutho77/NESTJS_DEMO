import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService) { }

  @Post('login')
  async signinLocal(
    @Body('username') username: string,
    @Body('password') password: string) {

    if (!await this.userService.checkExist(username)) {
      throw new BadRequestException('Username or password incorrect.');
    }

    const accessToken = await this.authService.signinLocal(username, password);

    return accessToken;
  }

  // Generate RefreshToken
  @Post('refreshToken')
  async generateRefreshToken(): Promise<string> {
    let refreshToken = '';

    return refreshToken;
  }

}
