import { Body, Controller, Post, Put, Param, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() postData: User): Promise<User> {
    return this.userService.createUser(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/pwupdate/:id')
  async updatePassword(
    @Body() postData: JSON,
    @Param('id') id: number,
  ): Promise<User> {
    return this.userService.updatePassword(id, postData);
  }
}
