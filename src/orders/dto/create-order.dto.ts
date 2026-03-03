import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  productSkus!: string[];
}
