import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

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
    const {createHash} = require('crypto')
    const pw = createHash('sha256').update(password).digest('base64');

    if (pw === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
