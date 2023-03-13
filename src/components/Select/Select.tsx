import {memo} from 'react'
import { SortByTypes } from 'src/types';
import style from "./Select.module.css";

const SORT_BY_OPTIONS = [
  { value: SortByTypes.RECOMMENDED, name: 'Recommended' },
  { value: SortByTypes.LOWEST_PRICE, name: 'Lowest price' },
  { value: SortByTypes.HIGHEST_PRICE, name: 'Highest price' },
  { value: SortByTypes.HIGHEST_DISCOUNT, name: 'Highest discount' },
];

type SelectProps = {
  sortType: SortByTypes;
  onChangeSortType: (sortType: SortByTypes) => void;
};

const Select = ({ sortType, onChangeSortType }: SelectProps) => {
  const handleSelectSortType: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    onChangeSortType(+e.target.value);
  };
  return (
    <label>
      Sort by:
      <select name="sort" value={sortType} onChange={handleSelectSortType} className={style.select}>
        {SORT_BY_OPTIONS.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default memo(Select);
