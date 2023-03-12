import { useEffect, useState } from "react";
import { Product, SortByTypes } from "src/types";
import { fetchData } from "src/utils";
import List from "src/components/List/";
import Select from "src/components/Select";

import "./App.module.css";

const App = () => {
  const [ads, setAds] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<SortByTypes>(
    SortByTypes.RECOMMENDED
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    fetchAds(sortType, pageNumber);
  }, []);

  const fetchAds = async (sortType: number, pageNumber: number) => {
    setLoading(true);
    try {
      const { products, pagination } = await fetchData(sortType, pageNumber);
      const { total, from, size } = pagination;

      const nextHasMorePages = from + size < total;

      setAds(products);
      setHasMorePages(nextHasMorePages);
    } catch (error) {
      // to do manage errors
    }
    setLoading(false);
  };

  const handleChangeSelectSortType = (nextSortType: SortByTypes) => {
    const nextPageNumber = 1;
    fetchAds(nextSortType, nextPageNumber);
    setPageNumber(nextPageNumber);
    setSortType(nextSortType);
  };

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
    <div>
      <div>
        <Select
          sortType={sortType}
          onChangeSortType={handleChangeSelectSortType}
        />
      </div>
      <List loading={loading} ads={ads}/>

      {hasMorePages && (<div>
                <button onClick={handleLoadMore}>
                    LOAD MORE
                </button>
            </div>)}
    </div>
  );
};

export default App;
