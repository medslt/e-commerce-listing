import {
  render,
  screen,
} from "@testing-library/react";
import {PRODUCTS} from 'src/Pages/App/__tests/data';
import List from "../List";


test("should render ads", async () => {
  render(<List loading={false} ads={PRODUCTS}/>);

  const adsEl = await screen.findAllByTestId("ad");

  expect(adsEl).toHaveLength(PRODUCTS.length);
});

test("should render the Image for each product", async () => {
  render(<List loading={false} ads={PRODUCTS}/>);


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
  render(<List loading={false} ads={PRODUCTS}/>);

  // Check the image for each PRODUCT
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    const productName = screen.getByText(currentProduct.productName);

    expect(productName).toBeInTheDocument();
  }
});

test("should render the Price for each product", async () => {
  render(<List loading={false} ads={PRODUCTS}/>);

  // Check the image for each PRODUCT
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    const expectedPrice = "£ " + currentProduct.price.priceIncTax;

    const price = screen.getByText(expectedPrice);

    expect(price).toBeInTheDocument();
  }
});





