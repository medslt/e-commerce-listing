export type Product = {
id: string,
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

type ImageType =  { 
    url: string, 
    attributes: {imageAltText: string}
}