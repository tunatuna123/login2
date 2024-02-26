import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: User): Promise<User> {
    let pw = data.password;
    console.log(pw);

    return this.prisma.user.create({
      data,
    });
  }
}
