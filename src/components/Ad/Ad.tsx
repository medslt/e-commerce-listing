
import style from './Ad.module.css'

import {Product} from 'src/types';


export type AdProps = Product  & {
    testId: string
}

const currencySymbols: {[key:string]: string} = {
    'GBP': '£'
}

const getFormattedPrice = (currencyCode: string, price: number) => {
    const currencySymbol = currencySymbols[currencyCode]
    const priceToDisplay = `${currencySymbol} ${price}`

    return priceToDisplay
}

const Ad = ({image, productName, price, brand, testId}: AdProps) => {
    const {url, attributes} = image
    const {currencyCode, priceIncTax} = price
    const priceToDisplay = getFormattedPrice(currencyCode, priceIncTax)

    return (

        <div className={style.ad} data-testid={testId}>
            <div>
                <img src={url}  width="270" loading="lazy"  alt={attributes.imageAltText} />
            </div>
            <div>
            <div>
                <img src={brand.brandImage.url} width="60"  loading="lazy"  alt={brand.brandImage.attributes.imageAltText} />
            </div>
                <div> {productName} </div>
                <div> {priceToDisplay}  </div>
            </div>
        </div>
    )
}


export default Ad