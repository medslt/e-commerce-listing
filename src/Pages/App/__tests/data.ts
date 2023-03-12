import {Product} from 'src/types';

export const PRODUCTS = [
    {
      id: "RANDOM_ID-1",
      productName: "RANDOM NAME 1",
      price: {
        currencyCode: "GBP",
        priceIncTax: 189.95,
        priceExcTax: 158.29,
        isOnPromotion: false,
      },
      image: {
        url: "IMG_URL_1",
        attributes: {
          imageAltText: "IMAGE DESCRIPTION 1",
        },
      },
      brand: {
        name: "Random Brand Name 1",
        brandImage: {
          url: "IMG_URL_1",
          attributes: {
            imageAltText: "BRAND IMAGE DESCRIPTION 1",
          },
        },
      },
    },
    {
      id: "RANDOM_ID-2",
      productName: "RANDOM NAME 2",
      price: {
        currencyCode: "GBP",
        priceIncTax: 186.95,
        priceExcTax: 159.29,
        isOnPromotion: false,
      },
      image: {
        url: "IMG_URL_2",
        attributes: {
          imageAltText: "IMAGE DESCRIPTION 2",
        },
      },
      brand: {
        name: "Random Brand Name 2",
        brandImage: {
          url: "IMG_URL_2",
          attributes: {
            imageAltText: "BRAND IMAGE DESCRIPTION 2",
          },
        },
      },
    },
  ] as Product[] ;
  
  export const MORE_PRODUCTS = [
    {
      id: "RANDOM_ID-3",
      productName: "RANDOM NAME 3",
      price: {
        currencyCode: "GBP",
        priceIncTax: 183.95,
        priceExcTax: 154.29,
        isOnPromotion: false,
      },
      image: {
        url: "IMG_URL_3",
        attributes: {
          imageAltText: "IMAGE DESCRIPTION 3",
        },
      },
      brand: {
        name: "Random Brand Name 3",
        brandImage: {
          url: "IMG_URL_3",
          attributes: {
            imageAltText: "BRAND IMAGE DESCRIPTION 3",
          },
        },
      },
    },
  ];


  export const PAGINATION = {
    from: 0,
    size: 30,
    total: 60,
    sortType: 1,
  };