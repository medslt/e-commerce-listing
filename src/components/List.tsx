import { useEffect, useState } from "react"
import style from './List.module.css'
type ImageType =  { 
        url: string, 
        attributes: {imageAltText: string}
    }
type AdProps = {
    testId: string
    id: string
    productName: string
    image: ImageType
    price: {
        currencyCode: string
        priceIncTax: number
        priceExcTax: number
        isOnPromotion: boolean
    }
    brand: {
        name: string
        brandImage: ImageType
    }
    attributes: {
        isApproved:	boolean
        isShownOnTv: boolean
        isBestSeller: boolean
        isFreeWaste: boolean
        isPremium: boolean
        isRecommended: boolean
        isAntiSlipIncluded: boolean
        isNew: boolean
        hasMoreOptions: boolean
    }
}

type JSONResponse = {
    products: AdProps[]
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

const PRODUCTS_URL = new URL('https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI')

const List = () => {
    const [ads, setAds] = useState<AdProps[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAds()
    }, [])
    
    const fetchAds = async() => {
        setLoading(true)
        try {

            const resp = await fetch(PRODUCTS_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
              "query": "toilets",
              "pageNumber": 1,
              "size": 30,
              "additionalPages": 0,
              "sort": 1
            }
            )
            })


            const data: JSONResponse = await resp.json()

            setAds(data.products)
        } catch (error) {
        }
        
        setLoading(false)
    }

    return <div className={style.list} data-testid="ad-list">{ 
          loading ? (<div> Loading ... </div>) :   ads.map((ad)=><Ad key={ad.id} {...ad} testId="ad"/>
        )
       }
    </div>
}

export default List