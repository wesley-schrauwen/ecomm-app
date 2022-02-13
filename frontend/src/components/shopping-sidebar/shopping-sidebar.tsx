import styled from 'styled-components';
import { Card, Icon, InputAdornment, Paper, TextField } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { buildProductChampionPhotoURL } from '../../api/utils';

const ShoppingSidebarStyle = styled(Paper)`
  background: whitesmoke;
  width: 284px;
  height: 640px;
  display: flex;
  flex-flow: column;
`;

interface Props {
  onClickRemoveProductFromCart: (product: Product) => void;
  products: Product[];
}

const ListCell = styled.div``;

const PriceTextField = styled(TextField).attrs({
  variant: 'outlined',
  disabled: true,
  label: 'Total'
})`
  margin: auto;
  display: block;
`;

const ListCellPhoto = styled.img`
  width: 64px;
  height: 64px;
`


export const ShoppingSidebar = (props: Props) => {

  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  React.useEffect(() => {
    setTotalPrice(
      props.products.reduce((previous, current) => previous + current.cost, 0)
    );
  }, [props.products])

  const rowRenderer = (listRowProps: ListRowProps): React.ReactNode => {

    const product = props.products[listRowProps.index];
    const imageURL = buildProductChampionPhotoURL(product.id);

    return (
      <ListCell {...listRowProps}>
        <ListCellPhoto src={imageURL} alt={'Image of car in cart'}/>
      </ListCell>
    );
  };

  return (
    <ShoppingSidebarStyle elevation={3}>
      <List
        rowCount={props.products.length}
        rowHeight={128}
        width={284}
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
