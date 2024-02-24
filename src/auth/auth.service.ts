import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

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
  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = testUsers.find((user) => user.username === username);
    if (!findUser) {
      return null;
    }
  }
}
