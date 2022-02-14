import styled from 'styled-components';
import { IconButton, Paper, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export const ShoppingSidebarStyle = styled(Paper)`
  background: whitesmoke;
  width: 284px;
  height: 640px;
  display: flex;
  flex-flow: column;
`;

export const ListCell = styled.div``;

export const PriceTextField = styled(TextField).attrs({
  variant: 'outlined',
  disabled: true,
  label: 'Total'
})`
  margin: auto;
  display: block;
`;

export const ListCellPhoto = styled.img`
  width: 64px;
  height: 64px;
`

export const ListCellContainer = styled.div`
  display: flex;
  flex-flow: row;
  margin: 8px;
`;

export const ListCellButton = styled(IconButton)`
  margin: auto 8px auto auto;
  height: 32px;
  width: 32px;
`;

export const ListCellTitle = styled(Typography).attrs({
  variant: 'body1'
})`
  display: block;
  margin: auto auto auto 8px;
`