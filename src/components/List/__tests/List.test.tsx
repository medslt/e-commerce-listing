import React from 'react';
import { render, screen , waitForElementToBeRemoved} from '@testing-library/react';
import List from '../List';

export const PRODUCTS = [{
    id	: 'RANDOM_ID-1',
    productName: 'RANDOM NAME 1',
    price: {
        currencyCode	:	'GBP',
            priceIncTax	:	189.95,
            priceExcTax	:	158.29,
            isOnPromotion	:	false,

    },
    image: {
        url: 'IMG_URL_1',
        attributes: {
            imageAltText: 'IMAGE DESCRIPTION 1'
        }
        
    },
    brand: {
      name: 'Random Brand Name 1',
      brandImage: { 
          url: 'IMG_URL_1',
        attributes: {
            imageAltText: 'BRAND IMAGE DESCRIPTION 1'
        }
      }
  }
},
{
  id	: 'RANDOM_ID-2',
  productName: 'RANDOM NAME 2',
  price: {
      currencyCode	:	'GBP',
          priceIncTax	:	186.95,
          priceExcTax	:	159.29,
          isOnPromotion	:	false,

  },
  image: {
      url: 'IMG_URL_2',
      attributes: {
          imageAltText: 'IMAGE DESCRIPTION 2'
      }
      
  },
  brand: {
    name: 'Random Brand Name 2',
    brandImage: { 
        url: 'IMG_URL_2',
      attributes: {
          imageAltText: 'BRAND IMAGE DESCRIPTION 2'
      }
    }
}
}

]

beforeAll(() => {
  jest.spyOn(window, 'fetch');
})

beforeEach(() => {
  (window.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({products: PRODUCTS}),
  });
})

test('should render ads', async () => {
  
  render(<List />);
  
  const adsEl = await screen.findAllByTestId('ad')
  
  expect(adsEl).toHaveLength(PRODUCTS.length)
});


test('should render the Image for each product', async () => {
  render(<List />);
  
 await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  // Check the image for each PRODUCT
  for(let i=0; i < PRODUCTS.length; i++ ){
    const currentProduct = PRODUCTS[i]
    const image = screen.getByRole('img', {
      name: currentProduct.image.attributes.imageAltText
    })

    expect(image).toBeInTheDocument()
  }
});

test('should render the Product Name for each product', async () => {
  render(<List />);
  
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  // Check the image for each PRODUCT
  for(let i=0; i < PRODUCTS.length; i++ ){
    const currentProduct = PRODUCTS[i]
    const productName = screen.getByText(currentProduct.productName)

    expect(productName).toBeInTheDocument()
  }
})

test('should render the Price for each product', async () => {
  render(<List />);
  
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  // Check the image for each PRODUCT
  for(let i=0; i < PRODUCTS.length; i++ ){
    const currentProduct = PRODUCTS[i]
    const expectedPrice = '£ ' + currentProduct.price.priceIncTax

    const price = screen.getByText(expectedPrice)

    expect(price).toBeInTheDocument()
  }
})