import { useEffect, useState, useReducer, useCallback } from "react";
import { Product, SortByTypes } from "src/types";
import { fetchData } from "src/utils";
import List from "src/components/List/";
import Select from "src/components/Select";
import "./App.module.css";

type State = {
  ads: Product[];
  sortType: SortByTypes;
  pageNumber: number;
  hasMorePages: boolean;
};


const stateReducer = (state: State, payload: Partial<State>) => {
  return { ...state, ...payload };
};

const DEFAULT_STATE = {
  ads: [],
  sortType: SortByTypes.RECOMMENDED,
  pageNumber: 1,
  hasMorePages: false,
};

const App = () => {
  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);
  const [loading, setLoading] = useState(false);

  const { ads, pageNumber, sortType, hasMorePages } = state;

  useEffect(() => {
    fetchAds(sortType, pageNumber);
  }, []);

  const fetchAds = async (sortType: number, pageNumber: number) => {
    setLoading(true);
    try {
      const { products, pagination } = await fetchData(sortType, pageNumber);
      const { total, from, size } = pagination;

      const nextHasMorePages = from + size < total;

      const newState = {
        pageNumber,
        sortType,
        ads: products,
        hasMorePages: nextHasMorePages,
      };

      dispatch(newState);
    } catch (error) {
      // to do manage errors
    }
    setLoading(false);
  };

  const handleChangeSelectSortType = useCallback((nextSortType: SortByTypes) => {
    const nextPageNumber = 1;
    fetchAds(nextSortType, nextPageNumber);
  }, []) 

  const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const nextPageNumber = pageNumber + 1;
    try {
      fetchData(sortType, nextPageNumber).then(({ products, pagination }) => {
        const { total, from, size } = pagination;
        const nextHasMorePages = from + size < total;

        const newState = {
          pageNumber: nextPageNumber,
          ads: [...ads, ...products],
          hasMorePages: nextHasMorePages,
        };
        dispatch(newState);
      });
    } catch (error) {
      // to do manage errors
    }
  };

  return (
    <div>
      <div>
        <Select
          sortType={sortType}
          onChangeSortType={handleChangeSelectSortType}
        />
      </div>
      <List loading={loading} ads={ads} />

      {hasMorePages && (
        <div>
          <button onClick={handleLoadMore}>LOAD MORE</button>
        </div>
      )}
    </div>
  );
};

export default App;
