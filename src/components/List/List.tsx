import { useEffect, useState } from "react"
import Ad from 'src/components/Ad/Ad'
import {Product, SortByTypes} from 'src/types';
import Select from './Select'
import style from './List.module.css'

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

const fetchData = async (sort: number, pageNumber: number, query:string = 'toilets', size:number=30, additionalPages:number=0) => {
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


const List = () => {
    const [ads, setAds] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [sortType, setSortType] = useState<SortByTypes>(SortByTypes.RECOMMENDED)
    const [pageNumber, setPageNumber] = useState(1)
    const [hasMorePages, setHasMorePages] = useState(false)

    useEffect(() => {
        fetchAds(sortType, pageNumber)
    }, [])
    

    const fetchAds = async (sortType: number, pageNumber: number) => {
        setLoading(true)
        try {
            const {products, pagination} = await fetchData(sortType, pageNumber)
            const {total, from, size} = pagination
            
            const nextHasMorePages = (from + size) < total

            setAds(products)
            setHasMorePages(nextHasMorePages)
        } catch (error) {
            // to do manage errors 
        }
            setLoading(false)
    }

    const handleChangeSelectSortType  = (nextSortType: SortByTypes) => {
        const nextPageNumber = 1
        fetchAds(nextSortType, nextPageNumber)
        setPageNumber(nextPageNumber)
        setSortType(nextSortType)
    }

    const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const nextPageNumber = pageNumber + 1
        setPageNumber(nextPageNumber)
        try {
            fetchData(sortType, nextPageNumber).then(({products, pagination}) => {
                const {total, from, size} = pagination
                const nextHasMorePages = (from + size) < total

                setAds([...ads, ...products])
                setHasMorePages(nextHasMorePages)
            }) 
        } catch (error) {
            // to do manage errors 
        }
    }

    return (
        <div  data-testid="ad-list">
            <div>
                <Select sortType={sortType} onChangeSortType={handleChangeSelectSortType} />
            </div>
            <div className={style.list}>
                {
                loading ?
                 (<div> Loading ... </div>) : 
                  ads.map((ad)=><Ad key={ad.id} {...ad} testId="ad"/>
                )
            }
            </div>
           {hasMorePages && (<div>
                <button onClick={handleLoadMore}>
                    LOAD MORE
                </button>
            </div>)
            }
        </div>
    )
}

export default List