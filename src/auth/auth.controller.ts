import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  logint(@Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);

    if (!user) {
      throw new HttpException('login error', 401);
    }
    return user;
  }
}
