import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.users.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
    });
    const tokens = this.issueTokens(user.id, user.email, user.role);
    return { ...tokens, user };
  }

  async login(dto: LoginDto) {
    const user = await this.users.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const tokens = this.issueTokens(user.id, user.email, user.role);
    return { ...tokens, user: { ...user, password: undefined } };
  }

  async me(user: any) {
    const dbUser = await this.users.findById(user.sub);
    if (!dbUser) throw new UnauthorizedException();
    return { ...dbUser, password: undefined };
  }

  private issueTokens(sub: string, email: string, role: string) {
    const accessToken = this.jwt.sign(
      { sub, email, role },
      { secret: process.env.JWT_SECRET || 'dev-secret', expiresIn: '5m' },
    );
    const refreshToken = this.jwt.sign(
      { sub, email, role },
      { secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret', expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }
}


