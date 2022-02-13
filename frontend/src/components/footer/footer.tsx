import styled from 'styled-components';
import { Button, ButtonGroup, Card, Icon, Paper, Typography } from '@mui/material';
import { THEME } from '../styles';
import {
  EmailOutlined,
  Instagram,
  PhoneOutlined,
  YouTube
} from '@mui/icons-material';

const FooterStyle = styled(Paper)`
  background: ${THEME.BLUE_ACCENT};
  height: 128px;
  margin-bottom: 0;
  margin-top: auto;
  display: flex;
  flex-flow: row;
`

const FooterPanel = styled(ButtonGroup).attrs({
  orientation: 'vertical',
  variant: 'text'
})`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  padding: 24px;
  width: 20%;
  flex-shrink: 0;
`

const LocationPanel = styled(Paper).attrs({
  variant: 'outlined'
})`
  flex-grow: 1;
  background: transparent;
  overflow: hidden;
`;

const EmailLink = styled.a`
  color: #1976d2;
  text-decoration: none;
`;

export const Footer = () => {
  return <FooterStyle>
    <FooterPanel>
      <Button startIcon={<Instagram />}>Instagram</Button>
      <Button startIcon={<YouTube />}>Youtube</Button>
    </FooterPanel>
    <FooterPanel>
      <Button startIcon={<EmailOutlined />}><EmailLink href={'mailto:help@smart-hardware.com'}>Email us</EmailLink></Button>
      <Button startIcon={<PhoneOutlined />}>000-000-0000</Button>
    </FooterPanel>
    <LocationPanel variant={'outlined'}>
      <img src={'example_maps.png'} alt={'Example Maps Integration'} />
    </LocationPanel>
  </FooterStyle>;
}