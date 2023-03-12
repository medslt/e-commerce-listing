import Ad from 'src/components/Ad/Ad'
import {Product} from 'src/types';
import style from './List.module.css'

type ListProps = {
    loading: boolean
    ads: Product[]
}
const List = ({ads, loading}: ListProps) => {
  
    if (loading) {
        return (<div> Loading ... </div>)
    }

    return (
        <div  data-testid="ad-list">
            <div className={style.list}>
              {ads.map((ad)=><Ad key={ad.id} {...ad} testId="ad"/>)}
            </div>
        </div>
    )
}

export default List