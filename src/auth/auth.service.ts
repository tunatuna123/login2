import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

const testUsers = [
  {
    id: 1,
    username: 'pinky',
    password: 'password1',
  },
  {
    id: 2,
    username: 'punky',
    password: 'password2',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.prisma.user.findUniqueOrThrow({
      where: { username: String(username) },
    });

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
