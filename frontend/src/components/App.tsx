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
  display: block;
`;

const CoreContent = styled.div`
  display: flex;
  flex-flow: row;
  min-height: 256px;
`;

function App() {
  return (
    <StyledApp className="App">
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
