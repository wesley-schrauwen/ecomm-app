import { Product } from "./models/product";

export const createProductFixture = (
  fixture: Partial<Product> = {},
): Product => ({
  location: 'test-location',
  mileage: 0,
  car_colour: 'red',
  car_brand: 'mazda',
  car_year: 1990,
  date_added: new Date().toISOString(),
  first_name: 'john',
  last_name: 'doe',
  cost: 100,
  id: 1,
  ...fixture,
});
