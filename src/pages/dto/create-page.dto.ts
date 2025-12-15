import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  type: string; 

  @IsString()
  @IsNotEmpty()
  title: string; 

  @IsString()
  @IsOptional()
  description?: string; 
}
