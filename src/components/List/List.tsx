import { useEffect, useState } from "react"
import Ad from 'src/components/Ad/Ad'
import {Product, SortByTypes} from 'src/types';
import style from './List.module.css'

type JSONResponse = {
    products: Product[]
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

    useEffect(() => {
        fetchAds(sortType)
    }, [])
    

    const fetchAds = async (sortType: number, pageNumber: number=1) => {
        setLoading(true)
        try {
            const data = await fetchData(sortType, pageNumber)

            setAds(data.products)
        } catch (error) {
            // to do manage errors 
        }
            setLoading(false)
    }

    const handleSelectSortType: React.ChangeEventHandler<HTMLSelectElement>  = (e) => {
        const nextSortType = +e.target.value
        fetchAds(nextSortType)
        setSortType(nextSortType)
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
                loading ? (<div> Loading ... </div>) : ads.map((ad)=><Ad key={ad.id} {...ad} testId="ad"/>
                )
            }
            </div>
        </div>
    )
}

export default List