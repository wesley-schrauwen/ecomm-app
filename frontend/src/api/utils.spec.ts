import { buildProductChampionPhotoURL } from './utils';

describe('api/utils', () => {
  describe('buildProductChampionPhotoURL', () => {
    it('builds a url for product champion',  () => {
      expect(buildProductChampionPhotoURL(1)).toEqual("http://localhost:3000/products/1/champion-photo")
    });
  });
});