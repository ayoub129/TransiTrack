import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../users/user.entity';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(['client', 'transporteur', 'admin'] as any)
  role!: UserRole;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  phone?: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}


