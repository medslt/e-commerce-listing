import { useEffect, useState } from "react"
import Ad from 'src/components/Ad/Ad'
import {Product, SortByTypes} from 'src/types';
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

const fetchData = async (sortType: number, pageNumber: number, query:string = 'toilets') => {
    const body =  JSON.stringify({
        size: 30,
        query,
        pageNumber,
        additionalPages: 0,
        sort: sortType
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

const SORT_BY_OPTIONS = [
    {value: SortByTypes.RECOMMENDED , name: 'Recommended'},
    {value: SortByTypes.LOWEST_PRICE , name: 'Lowest price'},
    {value: SortByTypes.HIGHEST_PRICE, name: 'Highest price' },
    {value: SortByTypes.HIGHEST_DISCOUNT, name:'Highest discount' },
]


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

    const handleSelectSortType: React.ChangeEventHandler<HTMLSelectElement>  = (e) => {
        const nextSortType = +e.target.value
        const nextPageNumber = 1
        fetchAds(nextSortType, nextPageNumber)
        setPageNumber(nextPageNumber)
        setSortType(nextSortType)
    }

    const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const nextPageNumber = pageNumber + 10
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
            <label>
                Sort by:
                <select name="sort" value={sortType} onChange={handleSelectSortType}>
                    {SORT_BY_OPTIONS.map(({value, name})=> (<option key={value} value={value}>{name}</option>))}
                </select>
                </label>
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