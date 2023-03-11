import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import List from '../List';

export const DATA = [{
  id	: 'RANDOM_ID-1',
  productName: 'RANDOM NAME 123',
  price: {
      currencyCode	:	'GBP',
          priceIncTax	:	189.95,
          priceExcTax	:	158.29,
          isOnPromotion	:	false,

  },
  image: {
      url: 'IMG_URL',
      attributes: {
          imageAltText: 'SOME DESCRIPTION'
      }
      
  },
  brand: {
    name: 'Random Brand Name',
    brandImage: { 
        url: 'IMG_URL',
      attributes: {
          imageAltText: 'SOME DESCRIPTION'
      }
    }
}
}

]

beforeAll(() => jest.spyOn(window, 'fetch'))

test('renders ads ', async () => {
  (window.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({products: DATA}),
  });

  render(<List />);
  
  const adsEl = await screen.findAllByTestId('ad')

  
  await waitFor(() =>  expect(adsEl).toHaveLength(DATA.length))
});
