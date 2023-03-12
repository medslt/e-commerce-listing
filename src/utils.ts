import {Product} from 'src/types';

type Pagination = {
    from: number
    size: number
    sortType: number
    total: number
}
type JSONResponse = {
    products: Product[]
    pagination: Pagination
  }

const PRODUCTS_URL = new URL('https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI')

export const fetchData = async (sort: number, pageNumber: number, query:string = 'toilets', size:number=30, additionalPages:number=0) => {
    const body =  JSON.stringify({
        size,
        query,
        pageNumber,
        additionalPages,
        sort
   })
   
    try {
        const resp = await fetch(PRODUCTS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        })

        const data: JSONResponse = await resp.json()

        return data
    } catch (error) {
        throw error
    }
};


