import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Product } from '../../models/product';
import React from 'react';
import { getNewsFeedItem } from '../../api/api';
import { buildProductChampionPhotoURL } from '../../api/utils';
import { AvTimer, ColorLens, DirectionsCar, LocationOn, Paid, PermContactCalendar } from '@mui/icons-material';
import { NewsBannerContent, NewsBannerImage, NewsBannerInfoBar, NewsBannerStyle } from './styles';

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
            <ListItem aria-label={'news-feed-car-year'}>
              <ListItemIcon>
                <PermContactCalendar />
              </ListItemIcon>
              <ListItemText>
                Year {newsProduct.car_year}
              </ListItemText>
            </ListItem>
            <ListItem aria-label={'news-feed-car-model'}>
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
            <ListItem aria-label={'news-feed-car-color'}>
              <ListItemIcon>
                <ColorLens />
              </ListItemIcon>
              <ListItemText>
                Color {newsProduct.car_colour}
              </ListItemText>
            </ListItem>
            <ListItem aria-label={'news-feed-car-mileage'}>
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
            <ListItem aria-label={'news-feed-car-cost'}>
              <ListItemIcon>
                <Paid />
              </ListItemIcon>
              <ListItemText>
                Cost {newsProduct.cost}
              </ListItemText>
            </ListItem>
            <ListItem aria-label={'news-feed-car-location'}>
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