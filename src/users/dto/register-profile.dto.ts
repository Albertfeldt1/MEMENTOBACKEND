import { IsOptional, IsString, IsEmail, IsDateString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;

  device_type?: string;
  device_token?: string;
}
