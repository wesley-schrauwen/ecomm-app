import { Props, ShoppingSidebar } from './shopping-sidebar';
import { createProductFixture } from '../../fixtures';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ShoppingSidebar', () => {

  let removeFromCartSpy: jest.Mock;

  beforeAll(() => {
    removeFromCartSpy = jest.fn();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const makeProps = (props: Partial<Props> = {}): Props => ({
    onClickRemoveProductFromCart: removeFromCartSpy,
    products: [],
    ...props
  });

  it('renders the shopping sidebar',  () => {
    render(<ShoppingSidebar {...makeProps()} />)

    const cartPriceComponent = screen.getByLabelText('total-cart-price');

    expect(cartPriceComponent).toBeInTheDocument();
  });

  describe('with products in the cart', () => {
    it('renders all available products',  () => {
      render(<ShoppingSidebar {...makeProps({
        products: [createProductFixture(), createProductFixture()]
      })} />);

      expect(screen.getAllByLabelText('cart-item')).toHaveLength(2);
    });

    it('calculates the total price',  () => {
      render(<ShoppingSidebar {...makeProps({
        products: [createProductFixture({ cost: 10000 }), createProductFixture({ cost: 10000 })]
      })} />);
      expect(screen.getByDisplayValue('20000')).toBeInTheDocument();
    });
  });

  describe('when remove button is selected', () => {
    it('fires remove event',  () => {
      const product = createProductFixture();
      render(<ShoppingSidebar {...makeProps({products: [product]})} />);
      userEvent.click(screen.getByLabelText('btn-remove-item-from-cart'));
      expect(removeFromCartSpy).toBeCalledTimes(1);
      expect(removeFromCartSpy).toBeCalledWith(product);
    });
  });

});