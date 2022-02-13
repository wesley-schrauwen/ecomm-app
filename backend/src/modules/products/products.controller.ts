import { Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { Product } from './models/product';
import { ProductsService } from './products.service';
import { ParsePositiveIntPipe } from '../../pipes/parse-positive-int.pipe';
import * as fs from 'fs';

@Controller('/products')
export class ProductsController {
  private readonly logger: Logger;

  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger(ProductsController.name);
  }

  @Get('/')
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('/news-feed')
  async getNewsFeed(): Promise<Product> {
    return this.productsService.getNewsFeedItem();
  }

  @Get('/:productId/champion-photo')
  async getProductChampion(
    @Param('productId', new ParsePositiveIntPipe()) productId: number,
    @Res() response,
  ): Promise<void> {
    this.logger.log('getting product champion');
    // This is just to make things use a little less space. The data set used has up to 15k image samples
    // and in the mock we have 200, so there is enough in the total set however 20 should be enough for demo purposes
    const index = `${productId % 20}`.padStart(5, '00000');
    try {
      fs.createReadStream(`./src/public/${index}.jpg`).pipe(response);
    } catch (error) {
      this.logger.error('failed to successfully stream', error);
    }
  }

  @Post('/check-out')
  async checkoutProducts(): Promise<void> {

  }
}
