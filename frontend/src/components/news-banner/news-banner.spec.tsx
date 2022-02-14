import { NewsBanner } from './news-banner';
import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../../api/api';
import { createProductFixture } from '../../fixtures';
import { getNewsFeedItem } from '../../api/api';
import { act } from '@testing-library/react-hooks';

describe('News Banner', () => {

  beforeEach(() => {
    jest.spyOn(api, 'getNewsFeedItem').mockResolvedValue(createProductFixture());
    jest.spyOn(window, 'setInterval');
    jest.spyOn(window, 'clearInterval');
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('renders the news banner',  async () => {
    render(<NewsBanner />);
    expect(getNewsFeedItem).toBeCalledTimes(1);

    await screen.findByAltText('news-feed-image')

    expect(screen.getByLabelText('news-feed-car-year')).toBeInTheDocument();
    expect(screen.getByLabelText('news-feed-car-model')).toBeInTheDocument();
    expect(screen.getByLabelText('news-feed-car-color')).toBeInTheDocument();
    expect(screen.getByLabelText('news-feed-car-mileage')).toBeInTheDocument();
    expect(screen.getByLabelText('news-feed-car-cost')).toBeInTheDocument();
    expect(screen.getByLabelText('news-feed-car-location')).toBeInTheDocument();
  });

  describe('when component is created', () => {
    it('creates an interval to update news feed',  () => {
      render(<NewsBanner />);
      expect(window.setInterval).toBeCalledTimes(1);
    });
  });


  describe('when component is destroyed', () => {
    it('clears interval ref',  async () => {
      const { unmount } = render(<NewsBanner />);
      await screen.findByAltText('news-feed-image')
      act(() => {
        unmount();
      });
      expect(window.clearInterval).toBeCalledTimes(1);
    });
  });
});