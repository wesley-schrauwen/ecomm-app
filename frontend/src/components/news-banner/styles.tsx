import styled from 'styled-components';
import { Paper } from '@mui/material';

export const NewsBannerStyle = styled.div`
  background: white;
  width: 100%;
  height: 128px;
  display: flex;
`;

export const NewsBannerContent = styled(Paper)`
  margin-right: 8px;
  margin-bottom: 8px;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`

export const NewsBannerImage = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  margin-left: 0;
  margin-right: auto;
`

export const NewsBannerInfoBar = styled.div`
  flex-grow: 1;
  display: flex;
`