import styled from 'styled-components';
import { Paper } from '@mui/material';

const HeaderStyle = styled(Paper)`
  width: 100%;
  height: 192px;
  margin: 8px 0;
`;

const Banner = styled.img`
  width: 100%;
  display: block;
  object-fit: fill;
  height: 100%;
`;

export const Header = () => {
  return (
    <HeaderStyle elevation={1}>
      <Banner src='./banner.jpg' alt='Company Banner'/>
    </HeaderStyle>
  );
}