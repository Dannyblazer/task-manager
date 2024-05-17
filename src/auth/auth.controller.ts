
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.validateUser(username, password);
    return { accessToken };
  }

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string): Promise<void> {
    await this.authService.register(username, password);
  }
}
