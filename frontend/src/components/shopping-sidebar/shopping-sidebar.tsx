import { InputAdornment } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { List, ListRowProps } from 'react-virtualized';
import { buildProductChampionPhotoURL } from '../../api/utils';
import { Remove } from '@mui/icons-material';
import {
  ListCell,
  ListCellButton,
  ListCellContainer,
  ListCellPhoto,
  ListCellTitle,
  PriceTextField,
  ShoppingSidebarStyle
} from './styles';


export interface Props {
  onClickRemoveProductFromCart: (product: Product) => void;
  products: Product[];
}

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
        <ListCellContainer aria-label={'cart-item'}>
          <ListCellPhoto src={imageURL} alt={'image of car in cart'}/>
          <ListCellTitle>{product.car_brand}</ListCellTitle>
          <ListCellButton aria-label={'btn-remove-item-from-cart'} onClick={() => props.onClickRemoveProductFromCart(product)}><Remove /></ListCellButton>
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
        <PriceTextField
          variant={'outlined'}
          value={totalPrice}
          disabled={true}
          aria-label={'total-cart-price'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            )
          }} />
    </ShoppingSidebarStyle>
  );
}
