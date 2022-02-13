import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator';

export class ProductDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  car_brand: string;

  @IsString()
  car_colour: string;

  @IsInt()
  @IsPositive()
  car_year: number;

  @IsString()
  location: string;

  @IsInt()
  @IsPositive()
  mileage: number;

  @IsInt()
  @IsPositive()
  cost: number;

  @IsDateString()
  date_added: string;
}
