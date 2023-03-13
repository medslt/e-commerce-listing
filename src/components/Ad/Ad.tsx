import { memo } from "react";
import { Product } from "src/types";
import style from "./Ad.module.css";

export type AdProps = Product & {
  testId?: string;
};

const currencySymbols: { [key: string]: string } = {
  GBP: "£",
};

const getFormattedPrice = (currencyCode: string, price: number) => {
  const currencySymbol = currencySymbols[currencyCode];
  const priceToDisplay = `${currencySymbol} ${price}`;

  return priceToDisplay;
};

const Ad = ({
  image,
  productName,
  price,
  brand,
  testId = "ad-test",
}: AdProps) => {
  const { url, attributes } = image;
  const { currencyCode, priceIncTax } = price;
  const priceToDisplay = getFormattedPrice(currencyCode, priceIncTax);

  return (
    <div className={style.adContainer}>
      <div className={style.ad} data-testid={testId}>
        <img
          src={url}
          loading="lazy"
          alt={attributes.imageAltText}
          className={style.image}
        />
        <div className={style.adBlockInfo}>
          <div>
            <img
              src={brand.brandImage.url}
              width="60"
              loading="lazy"
              alt={brand.brandImage.attributes.imageAltText}
            />
          </div>
          <div> {productName} </div>
          <div className={style.price}> {priceToDisplay} </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Ad);
