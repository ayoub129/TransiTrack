import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(['client', 'transporter', 'admin'])
  role!: 'client' | 'transporter' | 'admin';

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


