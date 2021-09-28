import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService) { }

  async signinLocal(username: string, password: string): Promise<string> {
    let accessToken = '';

    let user = await this.userService.getUser(username);
    if (!user || !await bcryptjs.compare(password, user.password)) {
      throw new BadRequestException('Username or password is invalid.')
    }

    if (user && await bcryptjs.compare(password, user.password)) {
      let payload = {
        id: user.id,
        username,
        fullname: `${user.firstname} ${user.lastname}`,
        phonenumber: user.phone_number
      };

      accessToken = this.jwtService.sign(payload);
    }

    return accessToken;
  }
}
