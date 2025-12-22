import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  planName: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  billingCycle?: string;

  @IsOptional()
  @IsArray()
  features?: string[];
}
