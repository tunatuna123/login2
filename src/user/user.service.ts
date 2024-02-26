import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: User): Promise<User> {
    if (
      await this.prisma.user.findUnique({
        where: { email: String(data.email) },
      })
    ) {
      throw new HttpException('Already accout with same email exist', 401);
    }

    const { createHash } = require('crypto');
    data.password = createHash('sha256').update(data.password).digest('base64');

    return this.prisma.user.create({
      data,
    });
  }
}
