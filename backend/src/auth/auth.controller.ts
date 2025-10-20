import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    try {
      return await this.auth.register(dto);
    } catch (e: any) {
      // basic log; in prod use a proper logger
      console.error('Register error:', e?.message || e);
      throw e;
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    try {
      return await this.auth.login(dto);
    } catch (e: any) {
      console.error('Login error:', e?.message || e);
      throw e;
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return this.auth.me(req.user);
  }
}


