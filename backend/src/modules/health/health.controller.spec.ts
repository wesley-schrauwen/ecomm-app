import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('health check', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /ping', () => {
    it('gets a health check', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/ping');
      expect(status).toEqual(200);
      expect(body).toEqual({
        health: 'OK',
      });
    });
  });
});
