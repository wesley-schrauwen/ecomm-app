import { Injectable } from '@nestjs/common';
import { Product } from './models/product';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private products: Product[];

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

  getTotalPriceOfProducts(productIds: number[]): number {
    let totalPrice = 0;

    // this is not particularly efficient. The space of productIds will be shrinking over time and we also know
    // the range of the numbers so this could be optimized if ever needed.
    this.products.forEach((product) => {
      if (productIds.includes(product.id)) {
        totalPrice += product.cost;
      }
    });

    return totalPrice;
  }
}
