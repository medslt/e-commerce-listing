import { useEffect, useState } from "react"
import Ad from 'src/components/Ad/Ad'
import {Product} from 'src/types';
import style from './List.module.css'

type JSONResponse = {
    products: Product[]
  }

const PRODUCTS_URL = new URL('https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI')

const List = () => {
    const [ads, setAds] = useState<Product[]>([])
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