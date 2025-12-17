import { IsOptional, IsEmail,  } from 'class-validator';
export class LoginDto {
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  device_type?: string;
  device_token?: string;
}
