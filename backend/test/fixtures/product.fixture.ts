import { Product } from '../../src/modules/products/models/product';

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

export const productExpectation = () => ({
  location: expect.any(String),
  mileage: expect.any(Number),
  car_colour: expect.any(String),
  car_brand: expect.any(String),
  car_year: expect.any(Number),
  date_added: expect.any(String),
  first_name: expect.any(String),
  last_name: expect.any(String),
  cost: expect.any(Number),
  id: expect.any(Number),
});
