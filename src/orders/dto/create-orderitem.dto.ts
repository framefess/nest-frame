import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
