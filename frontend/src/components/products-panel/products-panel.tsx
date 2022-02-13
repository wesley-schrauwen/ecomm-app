import styled from 'styled-components';
import { Product } from '../../models/product';
import React from 'react';
import { Button, Card, InputAdornment, TextField } from '@mui/material';
import { Add, Remove, SearchOutlined } from '@mui/icons-material';
import { AutoSizer, Grid, GridCellProps } from 'react-virtualized'
import { buildProductChampionPhotoURL } from '../../api/utils';
import Typography from '@mui/material/Typography';
import { THEME } from '../styles';

const ProductsPanelStyle = styled.div`
  width: 100%;
  height: auto;
`

const Toolbar = styled.div`
  width: 100%;
  height: 48px;
`

const ToolbarSearchField = styled(TextField).attrs({
  label: 'Search by brand',
  variant: 'standard'
})`
  width: 228px;
  margin-left: 8px;
`;

const ProductCell = styled.div`
  display: block;
`;

const ProductCard = styled(Card)`
  margin: auto;
  height: 95%;
  width: 95%;
  background: whitesmoke;
`;

const ProductCardActionBar = styled.div`
  height: 48px;
  display: flex;
  background: whitesmoke;
`;

const CardActionButton = styled(Button).attrs({
  variant: 'outlined',
})`
  height: 32px;
  min-width: 64px;
  margin: auto 8px auto auto;
`

const CardTitle = styled(Typography).attrs({
  variant: 'body1'
})`
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 8px;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`

interface Props {
  shoppingCart: Product[];
  products: Product[];
  onClickAddProductToCart: (product: Product) => void;
  onClickRemoveProductFromCart: (product: Product) => void;
}

export const ProductsPanel = (props: Props) => {
  const [searchFilter, setSearchFilter] = React.useState<string>('');
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(props.products);

  React.useEffect(() => {
    setFilteredProducts(props.products.filter(product => product.car_brand.toLowerCase().includes(searchFilter.toLowerCase())))
  }, [searchFilter]);

  const cellRenderer = (cellProps: GridCellProps): React.ReactNode => {
    const index = cellProps.rowIndex * 3 + cellProps.columnIndex;
    const product = filteredProducts[index];

    if (!product) {
      return null;
    }

    const imageString = buildProductChampionPhotoURL(product.id);
    const isInCart = props.shoppingCart.some(cartProduct => cartProduct.id === product.id);

    return (
      <ProductCell {...cellProps}>
        <ProductCard>
          <ProductCardActionBar>
            <CardTitle variant={'body1'}>{product.car_brand}</CardTitle>
            {isInCart ?
              <CardActionButton aria-label={'remove-car-from-cart'} onClick={() => props.onClickRemoveProductFromCart(product)} endIcon={<Remove />}>Remove</CardActionButton>
              : <CardActionButton aria-label={'add-car-to-cart'} onClick={() => props.onClickAddProductToCart(product)} endIcon={<Add />}>
              Add
            </CardActionButton>}
          </ProductCardActionBar>
          <CardImage src={imageString} alt='Photo of car' />
        </ProductCard>
      </ProductCell>
    );
  }

  return (
    <ProductsPanelStyle>
      <Toolbar>
        <ToolbarSearchField
          InputProps={
            {
              startAdornment:
                <InputAdornment position={'start'}>
                  <SearchOutlined/>
                </InputAdornment>
            }
          }
          onChange={(event) => setSearchFilter(event.target.value)}
        />
      </Toolbar>
        <AutoSizer style={{ margin: '8px' }}>
          {({height, width}) => {


            const totalRows = Math.ceil(filteredProducts.length / 3);
            const columnWidth = Math.round((width - 16) / 3);

            // A square shape with an extra 100 for the cell toolbar
            const cellHeight = columnWidth + 100;

            return (
              <Grid
                cellRenderer={cellRenderer}
                rowCount={totalRows}
                rowHeight={cellHeight}
                width={width - 16}
                height={height - 56}
                columnCount={3}
                columnWidth={columnWidth}
              />
            );
          }}
        </AutoSizer>
    </ProductsPanelStyle>
  )
}