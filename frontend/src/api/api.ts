import { Product } from "../models/product";
import { CheckoutRequest } from './models/checkout-request';
import { CheckoutResponse } from './models/checkout-response';

export const getAllProducts = async (): Promise<Product[]> => fetch('http://localhost:3000/products')
  .then(r => r.json());

export const getNewsFeed = async (): Promise<Product> => fetch('http://localhost:3000/products/news-feed').then(r => r.json());

export const createCheckout = async (checkoutRequest: CheckoutRequest ): Promise<CheckoutResponse> => fetch('http://localhost:3000/products/check-out', {
  method: 'POST',
  body: JSON.stringify(checkoutRequest)
}).then(r => r.json())
