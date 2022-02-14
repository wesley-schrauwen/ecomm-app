import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { productExpectation } from '../../../test/fixtures/product.fixture';

describe('Products Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /products', () => {
    it('gets a list of products', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/products',
      );
      expect(status).toEqual(200);
      expect(body).toBeInstanceOf(Array);
    });
  });

  describe('GET /products/news-feed', () => {
    it('gets a single product', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/products/news-feed',
      );
      expect(status).toEqual(200);
      expect(body).toEqual(productExpectation());
    });
  });

  describe('GET /products/:productId/champion-photo', () => {
    it('gets the champion photo for product', async () => {
      const { status} = await request(app.getHttpServer()).get(
        '/products/1/champion-photo',
      );
      expect(status).toEqual(200);
    });
    it('returns bad request on bad product id', async () => {
      const { status } = await request(app.getHttpServer()).get(
        '/products/id/champion-photo',
      );
      expect(status).toEqual(400);
    });
  });


});
