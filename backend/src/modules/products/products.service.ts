import { Injectable } from '@nestjs/common';
import { Product } from './models/product';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private readonly products: Product[];

  constructor() {
    this.products = JSON.parse(
      fs.readFileSync('./src/modules/products/MOCK_DATA.json', {
        encoding: 'utf8',
      }),
    );
  }

  getProducts(): Product[] {
    return this.products;
  }

  getNewsFeedItem(): Product {
    const randomItemIndex = Math.round(
      Math.random() * (this.products.length - 1),
    );

    return this.products[randomItemIndex];
  }
}
