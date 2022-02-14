import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ProductsService } from './products.service';
import {
  createProductFixture,
  productExpectation,
} from '../../../test/fixtures/product.fixture';

describe('Products Service', () => {
  let productsService: ProductsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    productsService = app.get(ProductsService);
  });

  beforeEach(() => {
    productsService['products'] = [createProductFixture()];
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('returns a list of products', () => {
      const products = productsService.getProducts();
      expect(products).toEqual([productExpectation()]);
    });
  });

  describe('getNewsFeedItem', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random');
    });

    it('returns a single product', () => {
      const product = productsService.getNewsFeedItem();
      expect(product).toEqual(productExpectation());
      expect(Math.random).toBeCalledTimes(1);
    });
  });

  describe('getTotalPriceOfProducts', () => {
    beforeEach(() => {
      productsService['products'] = [
        createProductFixture({ id: 1, cost: 100 }),
        createProductFixture({ id: 2, cost: 500 }),
      ];
    });

    it('gets the total price', () => {
      const totalPrice = productsService.getTotalPriceOfProducts([1, 2]);
      expect(totalPrice).toEqual(600);
    });
  });
});
