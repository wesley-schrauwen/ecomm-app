import styled from 'styled-components';
import { Button, Card, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export const ProductsPanelStyle = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  height: 100%;
`;

export const ContentPanel = styled.div`
  flex-grow: 1;
`

export const Toolbar = styled.div`
  width: 100%;
  height: 48px;
`

export const ToolbarSearchField = styled(TextField).attrs({
  label: 'Search by brand',
  variant: 'standard'
})`
  width: 228px;
  margin-left: 8px;
`;

export const ProductCell = styled.div`
  display: block;
`;

export const ProductCard = styled(Card)`
  margin: auto;
  height: 95%;
  width: 95%;
  background: whitesmoke;
`;

export const ProductCardActionBar = styled.div`
  height: 48px;
  display: flex;
  background: whitesmoke;
`;

export const CardActionButton = styled(Button).attrs({
  variant: 'outlined',
})`
  height: 32px;
  min-width: 64px;
  margin: auto 8px auto auto;
`

export const CardTitle = styled(Typography).attrs({
  variant: 'body1'
})`
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 8px;
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`