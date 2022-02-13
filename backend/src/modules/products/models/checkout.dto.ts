import { ArrayUnique, IsPositive } from 'class-validator';

export class CheckoutDto {
  @IsPositive({ each: true })
  @ArrayUnique()
  productIds: number[];
}
