import {
  within,
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

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
];

const MORE_PRODUCTS = [
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

const PAGINATION = {
  from: 0,
  size: 30,
  total: 60,
  sortType: 1,
};

beforeAll(() => {
  jest.spyOn(window, "fetch");
});

beforeEach(() => {
  (window.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ products: PRODUCTS, pagination: PAGINATION }),
  });
});

test("should render ads", async () => {
  render(<App />);

  const adsEl = await screen.findAllByTestId("ad");

  expect(adsEl).toHaveLength(PRODUCTS.length);
});

test("should render the Image for each product", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  // Check the image for each PRODUCT
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    const image = screen.getByRole("img", {
      name: currentProduct.image.attributes.imageAltText,
    });

    expect(image).toBeInTheDocument();
  }
});

test("should render the Product Name for each product", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  // Check the image for each PRODUCT
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    const productName = screen.getByText(currentProduct.productName);

    expect(productName).toBeInTheDocument();
  }
});

test("should render the Price for each product", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  // Check the image for each PRODUCT
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    const expectedPrice = "£ " + currentProduct.price.priceIncTax;

    const price = screen.getByText(expectedPrice);

    expect(price).toBeInTheDocument();
  }
});

test("should render all Sort BY filter options", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  const sortSelect = screen.getByRole("combobox", {
    name: /sort by:/i,
  });

  expect(within(sortSelect).getAllByRole("option").length).toBe(4);
});

test("should correctly set default option to Sort BY filter", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const sortSelect = screen.getByRole("combobox", {
    name: /sort by:/i,
  }) as HTMLSelectElement;

  const recommendedOption = within(sortSelect).getByRole("option", {
    name: "Recommended",
  }) as HTMLOptionElement;
  expect(recommendedOption.selected).toBe(true);
});

test("should allow user to change Sort_By filter", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const sortSelect = screen.getByRole("combobox", {
    name: /sort by:/i,
  });

  userEvent.selectOptions(
    sortSelect,
    screen.getByRole("option", { name: "Lowest price" })
  );

  const LowestPriceOption = within(sortSelect).getByRole("option", {
    name: "Lowest price",
  }) as HTMLOptionElement;

  await waitFor(() => expect(LowestPriceOption.selected).toBe(true));
});

test("should display Load more button", async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const loadMoreBtn = screen.getByRole("button", {
    name: /load more/i,
  });

  expect(loadMoreBtn).toBeInTheDocument();
});

test("should load more ads when user click on Load more button", async () => {
  (window.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ products: MORE_PRODUCTS, pagination: PAGINATION }),
  });

  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const loadMoreBtn = screen.getByRole("button", {
    name: /load more/i,
  });

  userEvent.click(loadMoreBtn);

  await waitFor(() =>
    expect(screen.getAllByTestId("ad")).toHaveLength(
      PRODUCTS.length + MORE_PRODUCTS.length
    )
  );
});
