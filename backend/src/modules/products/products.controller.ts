import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParsePositiveIntPipe } from '../../pipes/parse-positive-int.pipe';
import * as fs from 'fs';
import { ProductDto } from './models/product.dto';
import { CheckoutDto } from './models/checkout.dto';
import { CheckoutResponseDto } from './models/checkout-response.dto';

@Controller('/products')
export class ProductsController {
  private readonly logger: Logger;

  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger(ProductsController.name);
  }

  @Get('/')
  async getProducts(): Promise<ProductDto[]> {
    this.logger.log('getting list of all products');
    return this.productsService.getProducts();
  }

  @Get('/news-feed')
  async getNewsFeed(): Promise<ProductDto> {
    this.logger.log('getting item for news feed');
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
    const index = `${(productId % 20) + 1}`.padStart(5, '00000');
    try {
      fs.createReadStream(`./src/public/${index}.jpg`).pipe(response);
    } catch (error) {
      this.logger.error('failed to successfully stream', error);
    }
  }

  @Post('/check-out')
  async checkoutProducts(
    @Body() checkoutDto: CheckoutDto,
  ): Promise<CheckoutResponseDto> {
    this.logger.log('doing checkout');

    const totalPrice = this.productsService.getTotalPriceOfProducts(
      checkoutDto.productIds,
    );

    return {
      success: true,
      total_price: totalPrice,
    };
  }
}
