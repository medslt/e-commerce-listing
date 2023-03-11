import { useEffect, useState } from "react"

const url = new URL('https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI')

type AdProps = {
    testId: string
}

const Ad = ({testId}: AdProps) => {
    return (

        <div data-testid={testId}>
            add
        </div>
    )
}
const List = () => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        fetchAds()
    }, [])
    
    const fetchAds = async() => {
            const resp = await fetch(url, {
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

        const data = await resp.json()

        setAds(data.products)
    }

    return <div >{ 
        ads.map((ad, index)=> {
        return <Ad key={index} testId="ad"/>
    })}
    </div>
}

export default List