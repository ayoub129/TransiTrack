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

  async register(dto: RegisterDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await this.users.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
    });
    const userId = (user as any)._id?.toString?.() || (user as any).id;
    const tokens = this.issueTokens(userId, user.email, user.role);
    return { ...tokens, user };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await this.users.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const userId = (user as any)._id?.toString?.() || (user as any).id;
    const tokens = this.issueTokens(userId, (user as any).email, (user as any).role);
    return { ...tokens, user: { ...user, password: undefined } };
  }

  async me(user: any): Promise<any> {
    const dbUser = await this.users.findById(user.sub);
    if (!dbUser) throw new UnauthorizedException();
    const obj = dbUser.toObject ? dbUser.toObject() : dbUser;
    delete (obj as any).password;
    return obj;
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


