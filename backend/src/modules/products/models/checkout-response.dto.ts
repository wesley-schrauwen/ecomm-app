import { IsBoolean, IsInt } from 'class-validator';

export class CheckoutResponseDto {
  @IsBoolean()
  success: boolean;

  @IsInt()
  total_price: number;
}
