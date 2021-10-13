import { BadRequestException, Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/user-create.dto';
import { UpdateUserDTO } from 'src/dto/user-update.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Post('register')
  createNewUser(@Body() body: CreateUserDTO) {
    let { username, password } = body;
    if (!this.userService.validationUser(username, password)) {
      throw new BadRequestException('Invalid username or password.')
    }

    return this.userService.createNewUser(body);
  }

  @Post('change-password')
  async changePassword(
    @Body('id') id: string,
    @Body('password') newPassword: string) {
    return await this.userService.changePassword(id, newPassword);
  }

  @Post('update/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.userService.updateUser(id, body);
  }

}
