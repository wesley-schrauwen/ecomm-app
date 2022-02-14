import * as api from '../api/api';
import { createProductFixture } from '../fixtures';
import { render, screen } from '@testing-library/react';
import { getAllProducts } from '../api/api';
import { App } from './App';
import { Product } from '../models/product';
import userEvent from '@testing-library/user-event';

jest.mock('react-virtualized', () => ({
  ...jest.requireActual('react-virtualized'),
  // @ts-ignore
  AutoSizer: ({ children }) => children({ height: 1000, width: 1000 })
}));

jest.mock('././news-banner/news-banner', () => ({
  ...jest.requireActual('./news-banner/news-banner'),
  NewsBanner: (props: any) => <div {...props} />
}));

describe('App', () => {

  let products: Product[];

  beforeEach(() => {
    products = [createProductFixture({ id: 1 }), createProductFixture({ id: 2 })];
    jest.spyOn(api, 'getAllProducts').mockResolvedValue(products);
  });

  it('gets all products',  () => {
    render(<App />);
    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });

  it('handles adding products',  async () => {
    render(<App />);
    await screen.findAllByLabelText('btn-add-car-to-cart');
    userEvent.click(screen.getAllByLabelText('btn-add-car-to-cart')[0]);
    expect(screen.getAllByLabelText('cart-item')).toHaveLength(1);
  });

  it('handles removing products',  async () => {
    render(<App />);
    await screen.findAllByLabelText('btn-add-car-to-cart');
    userEvent.click(screen.getAllByLabelText('btn-add-car-to-cart')[0]);
    userEvent.click(screen.getByLabelText('btn-remove-car-from-cart'))
    expect(screen.queryAllByLabelText('cart-item')).toHaveLength(0);
  });

});