import React from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { Footer } from './footer';
import { ProductsPanel } from './products-panel';
import { ShoppingSidebar } from './shopping-sidebar';

const StyledApp = styled.div`
  max-width: 1080px;
  background: red;
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

function App() {
  return (
    <StyledApp>
      <Header />
      <CoreContent>
        <ProductsPanel />
        <ShoppingSidebar />
      </CoreContent>
      <Footer />
    </StyledApp>
  );
}

export default App;
