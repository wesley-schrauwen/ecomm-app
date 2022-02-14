import styled from 'styled-components';
import { Button, Card, Icon, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { buildProductChampionPhotoURL } from '../../api/utils';
import { Remove } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

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

const ListCellContainer = styled.div`
  display: flex;
  flex-flow: row;
  margin: 8px;
`;

const ListCellButton = styled(IconButton)`
  margin: auto;
  margin-right: 8px;
  height: 32px;
  width: 32px;
`;

const ListCellTitle = styled(Typography).attrs({
  variant: 'body1'
})`
  display: block;
  margin: auto auto auto 8px;
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
        <ListCellContainer>
          <ListCellPhoto src={imageURL} alt={'Image of car in cart'}/>
          <ListCellTitle>{product.car_brand}</ListCellTitle>
          <ListCellButton aria-label={'remove-item-from-cart'} onClick={() => props.onClickRemoveProductFromCart(product)}><Remove /></ListCellButton>
        </ListCellContainer>
      </ListCell>
    );
  };

  return (
    <ShoppingSidebarStyle elevation={3}>
      <List
        rowCount={props.products.length}
        rowHeight={80}
        width={284}
        height={512}
        rowRenderer={rowRenderer}
      />
        <PriceTextField variant={'outlined'} value={totalPrice} disabled={true}
                        aria-label={'total-cart-price'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            )
          }} />
    </ShoppingSidebarStyle>
  );
}
