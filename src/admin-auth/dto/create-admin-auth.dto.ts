import {  IsString } from 'class-validator';

export class CreateAdminAuthDto {


  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string; 

  @IsString()
  ImageData: string;
}
