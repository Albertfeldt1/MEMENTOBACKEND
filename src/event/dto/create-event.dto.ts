import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  image: string;
}
