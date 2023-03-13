import {
  render,
  screen,
} from "@testing-library/react";
import {PRODUCTS} from 'src/Pages/App/__tests/data';
import Ad from "../Ad";

const PRODUCT = PRODUCTS[0]


test("should render the Image of the product", () => {
  render(<Ad {...PRODUCT}/>);


  const image = screen.getByRole("img", {
    name: PRODUCT.image.attributes.imageAltText,
  });

  expect(image).toBeInTheDocument();
});

test("should render the Product Name of the product", () => {
  render(<Ad {...PRODUCT}/>);

  const productName = screen.getByText(PRODUCT.productName);

  expect(productName).toBeInTheDocument();
});

test("should render the Price of the product", () => {
  render(<Ad {...PRODUCT}/>);

  const expectedPrice = "£ " + PRODUCT.price.priceIncTax;

    const price = screen.getByText(expectedPrice);

    expect(price).toBeInTheDocument();
});





