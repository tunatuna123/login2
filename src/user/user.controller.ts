import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() postData: User): Promise<User> {
    return this.userService.createUser(postData);
  }

  @Put(':id')
  async updatePassword(
    @Body() postData: JSON,
    @Param('id') id: number,
  ): Promise<User> {
    return this.userService.updatePassword(id, postData);
  }
}
