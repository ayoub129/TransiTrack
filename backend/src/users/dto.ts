import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateMeDto {
  @IsOptional()
  @IsIn(['client', 'transporter', 'admin'])
  role?: 'client' | 'transporter' | 'admin';

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}


