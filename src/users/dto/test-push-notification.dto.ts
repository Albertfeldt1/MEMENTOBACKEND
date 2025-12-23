import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TestPushNotificationDto {
  @IsString()
  @IsNotEmpty()
  device_token: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

}
