import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: User): Promise<User> {
    const {createHash} = require('crypto')
    const pw = createHash('sha256').update(data.password).digest('base64');
    data.password = pw

    return this.prisma.user.create({
      data,
    });
  }
}
