import React from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { Footer } from './footer';
import { ProductsPanel } from './products-panel';
import { ShoppingSidebar } from './shopping-sidebar';
import { Product } from '../models/product';
import { getAllProducts } from '../api/api';

const StyledApp = styled.div`
  max-width: 1080px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const CoreContent = styled.div`
  display: flex;
  flex-flow: row;
  flex-grow: 1;
`;

export const App = () => {

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  return (
    <StyledApp>
      <Header />
      <CoreContent>
        <ProductsPanel products={products} />
        <ShoppingSidebar />
      </CoreContent>
      <Footer />
    </StyledApp>
  );
}
