import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';

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

  async updatePassword(id: number, newPassword: JSON): Promise<User> {
    const NewPassword = JSON.parse(JSON.stringify(newPassword)).password
    const { createHash } = require('crypto');
    return this.prisma.user.update({
        where: { id: Number(id) },
        data: {
            password: createHash('sha256').update(NewPassword).digest('base64')
        },
      });
  }
}
