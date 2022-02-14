import { Product } from '../../models/product';
import React from 'react';
import { InputAdornment } from '@mui/material';
import { Add, Remove, SearchOutlined } from '@mui/icons-material';
import { AutoSizer, Grid, GridCellProps } from 'react-virtualized'
import { buildProductChampionPhotoURL } from '../../api/utils';
import {
  CardActionButton,
  CardImage, CardTitle,
  ProductCard,
  ProductCardActionBar,
  ProductCell,
  ContentPanel,
  Toolbar,
  ToolbarSearchField, ProductsPanelStyle
} from './styles';
import { NewsBanner } from '../news-banner/news-banner';

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
  }, [props.products, searchFilter]);

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
      <NewsBanner />
      <ContentPanel>
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

            console.log(width);

            const totalRows = Math.ceil(filteredProducts.length / 3);
            const columnWidth = Math.round((width - 16) / 3);

            console.log(columnWidth);

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
      </ContentPanel>
    </ProductsPanelStyle>
  )
}