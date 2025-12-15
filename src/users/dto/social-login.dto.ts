// dto/social-login.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class SocialLoginDto {
  @IsOptional()
  @IsString()
  socialId: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  device_type?: string;

  @IsOptional()
  device_token?: string;
}
