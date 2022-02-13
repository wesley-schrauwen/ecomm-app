import React from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { Footer } from './footer';
import { ProductsPanel } from './products-panel';
import { ShoppingSidebar } from './shopping-sidebar';
import { Product } from '../models/product';
import { getAllProducts } from '../api/api';
import { Autorenew } from '@mui/icons-material';

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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shoppingCart, setShoppingCart] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchProducts();
  }, [])

  const addProductToCart = (addedProduct: Product): void => {
    if (shoppingCart.some(product => product.id === addedProduct.id)) {
      return;
    }

    setShoppingCart([...shoppingCart, addedProduct]);
  }

  const removeProductFromCart = (removeProduct: Product): void => {
    setShoppingCart(shoppingCart.filter(product => product.id !== removeProduct.id));
  }

  return (
    <StyledApp>
      <Header />
      <CoreContent>
        {!isLoading && (
          <>
            <ProductsPanel products={products} onClickAddProductToCart={addProductToCart} shoppingCart={shoppingCart} onClickRemoveProductFromCart={removeProductFromCart}/>
            <ShoppingSidebar />
          </>
        )}
      </CoreContent>
      <Footer />
    </StyledApp>
  );
}
