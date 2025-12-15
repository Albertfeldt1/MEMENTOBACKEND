import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class EditProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  device_type?: string;

  @IsOptional()
  @IsString()
  device_token?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
