import styled from 'styled-components';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { getNewsFeedItem } from '../../api/api';
import { buildProductChampionPhotoURL } from '../../api/utils';
import { AvTimer, ColorLens, DirectionsCar, LocationOn, Paid, PermContactCalendar } from '@mui/icons-material';

const NewsBannerStyle = styled.div`
  background: white;
  width: 100%;
  height: 128px;
  display: flex;
`;

const NewsBannerContent = styled(Paper)`
  margin-right: 8px;
  margin-bottom: 8px;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`

const NewsBannerImage = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  margin-left: 0;
  margin-right: auto;
`

const NewsBannerInfoBar = styled.div`
  flex-grow: 1;
  display: flex;
`

export const NewsBanner = () => {

  const NEWS_FEED_TIMER: number = 5000;
  const [timerRef, setTimerRef] = React.useState<NodeJS.Timer | null>(null);
  const [newsProduct, setNewsProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {

    async function getNewsItem() {
      const product = await getNewsFeedItem();
      setNewsProduct(product);
    }

    getNewsItem();

    const intervalId = setInterval(() => {
      getNewsItem();
    }, NEWS_FEED_TIMER);

    setTimerRef(intervalId)

    return () => {
      if (timerRef) {
        clearInterval(timerRef);
      }
    }
  }, []);

  if (!newsProduct) {
    return <NewsBannerStyle />;
  }

  const newsFeedImageURL = buildProductChampionPhotoURL(newsProduct.id);

  return (
    <NewsBannerStyle>
      <NewsBannerContent elevation={1}>
        <NewsBannerImage src={newsFeedImageURL} alt={'news-feed-image'} />
        <NewsBannerInfoBar>
          <List>
            <ListItem>
              <ListItemIcon>
                <PermContactCalendar />
              </ListItemIcon>
              <ListItemText>
                Year {newsProduct.car_year}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DirectionsCar />
              </ListItemIcon>
              <ListItemText>
                Model {newsProduct.car_brand}
              </ListItemText>
            </ListItem>
          </List>
          <Divider orientation={'vertical'} />
          <List>
            <ListItem>
              <ListItemIcon>
                <ColorLens />
              </ListItemIcon>
              <ListItemText>
                Color {newsProduct.car_colour}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AvTimer />
              </ListItemIcon>
              <ListItemText>
                Mileage {newsProduct.mileage}
              </ListItemText>
            </ListItem>
          </List>
          <Divider orientation={'vertical'} />
          <List>
            <ListItem>
              <ListItemIcon>
                <Paid />
              </ListItemIcon>
              <ListItemText>
                Cost {newsProduct.cost}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText>
                Location {newsProduct.location}
              </ListItemText>
            </ListItem>
          </List>
        </NewsBannerInfoBar>
      </NewsBannerContent>
    </NewsBannerStyle>
  );
}