import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

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
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = testUsers.find((user) => user.username === username);
    if (!findUser) {
      return null;
    }
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
