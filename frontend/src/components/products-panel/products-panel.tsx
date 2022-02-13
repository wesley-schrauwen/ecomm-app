import styled from 'styled-components';
import { Product } from '../../models/product';

const ProductsPanelStyle = styled.div`
  background: aqua;
  width: 100%;
  height: auto;
  display: block;
`

interface Props {
  products: Product[];
  // onClickAddProductToCart: (product: Product) => void;
}

export const ProductsPanel = (props: Props) => {
  return <ProductsPanelStyle />
}