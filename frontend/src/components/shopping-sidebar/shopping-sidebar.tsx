import styled from 'styled-components';
import { Card, Icon, InputAdornment, TextField } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { List, ListRowProps } from 'react-virtualized';

const ShoppingSidebarStyle = styled(Card)`
  background: whitesmoke;
  width: 384px;
  height: 640px;
  display: flex;
  flex-flow: column;
`;

interface Props {
  onClickRemoveProductFromCart: (product: Product) => void;
  products: Product[];
}

const ListCell = styled.div`
  background: blue;
`;

const PriceTextField = styled(TextField).attrs({
  variant: 'outlined',
  disabled: true,
  label: 'Total'
})`
  margin: auto;
  display: block;
`;

export const ShoppingSidebar = (props: Props) => {

  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  React.useEffect(() => {
    setTotalPrice(
      props.products.reduce((previous, current) => previous + current.cost, 0)
    );
  }, [props.products])

  const rowRenderer = (props: ListRowProps): React.ReactNode => {
    return <ListCell {...props} />
  };

  return (
    <ShoppingSidebarStyle>
      <List
        rowCount={props.products.length}
        rowHeight={128}
        width={356}
        height={512}
        rowRenderer={rowRenderer}
      />
        <PriceTextField variant={'outlined'} value={totalPrice} disabled={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            )
          }} />
    </ShoppingSidebarStyle>
  );
}
