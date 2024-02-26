import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createProduct(@Body() postData: User): Promise<User> {
    return this.userService.createUser(postData);
  }
}
