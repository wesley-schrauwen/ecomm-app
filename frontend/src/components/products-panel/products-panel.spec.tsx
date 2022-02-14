import { ProductsPanel, Props } from './products-panel';
import { render, screen } from '@testing-library/react';
import { createProductFixture } from '../../fixtures';
import userEvent from '@testing-library/user-event';

jest.mock('react-virtualized', () => ({
  ...jest.requireActual('react-virtualized'),
  // @ts-ignore
  AutoSizer: ({ children }) => children({ height: 1000, width: 1000 })
}))

describe('Products Panel', () => {

  const addProductToCartSpy: jest.Mock = jest.fn();
  const removeProductToCartSpy: jest.Mock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const makeProps = (props: Partial<Props> = {}): Props => ({
    shoppingCart: [],
    onClickAddProductToCart: addProductToCartSpy,
    onClickRemoveProductFromCart: removeProductToCartSpy,
    products: [],
    ...props
  });

  it('renders the products panel', () => {
    render(<ProductsPanel {...makeProps({
      products: [
        createProductFixture(),
        createProductFixture(),
        createProductFixture(),
        createProductFixture()
      ]
    })} />);

    expect(screen.getByLabelText('input-search-field')).toBeInTheDocument();
    expect(screen.getAllByLabelText('product-card')).toHaveLength(4);
  });

  describe('when user selects add product', () => {
    it('fires add product event',  () => {
      const product = createProductFixture();
      render(<ProductsPanel {...makeProps({
        products: [
          product
        ]
      })} />);

      userEvent.click(screen.getByLabelText('btn-add-car-to-cart'));
      expect(addProductToCartSpy).toBeCalledTimes(1);
      expect(addProductToCartSpy).toBeCalledWith(product);
    });
  });

  describe('when user enters filter text', () => {
    it('filters the grid',  () => {
      render(<ProductsPanel {...makeProps({
        products: [
          createProductFixture(),
          createProductFixture(),
          createProductFixture(),
          createProductFixture({ car_brand: 'ultimate_machine' })
        ]
      })} />);

      userEvent.type(screen.getByPlaceholderText('Search'), 'ultimate_machine');
      expect(screen.getAllByLabelText('product-card')).toHaveLength(1);
    });
  });

  describe('when product is in shopping cart', () => {
    it('sets action button to remove',  () => {
      const product = createProductFixture();
      render(<ProductsPanel {...makeProps({
        products: [
          product
        ],
        shoppingCart: [
          product
        ]
      })} />);

      expect(screen.getByLabelText('btn-remove-car-from-cart')).toBeInTheDocument();
    });

    it('fires remove event when selected',  () => {
      const product = createProductFixture();
      render(<ProductsPanel {...makeProps({
        products: [
          product
        ],
        shoppingCart: [
          product
        ]
      })} />);

      userEvent.click(screen.getByLabelText('btn-remove-car-from-cart'));
      expect(removeProductToCartSpy).toBeCalledTimes(1);
      expect(removeProductToCartSpy).toBeCalledWith(product);
    });
  });

});