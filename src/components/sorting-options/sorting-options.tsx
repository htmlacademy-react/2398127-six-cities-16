import { AppRoute, Sorts} from '../../const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOpenedStatus } from '../../store/sorting-process/selectors';
import { closeSorting, openSorting } from '../../store/sorting-process/sorting-process';
import { changeSorting } from '../../store/offer-data/offer-data';
import { getActiveSorting } from '../../store/offer-data/selectors';

function SortingOptions(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(getOpenedStatus);
  const activeSort = useAppSelector(getActiveSorting);

  const sortingFormClickHandler = () => {
    if (isOpened) {
      dispatch(closeSorting());
    } else {
      dispatch(openSorting());
    }
    navigate(AppRoute.Root);
  };

  const sortingFormChangeHandler = (sortType: string) => {
    dispatch(changeSorting(sortType));
    navigate(AppRoute.Root);
  };

  return (
    <form className="places__sorting" action="#" method="get"
      onClick={sortingFormClickHandler}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {
          Object.values(Sorts)
            .map((filter) => (
              <li
                className={`places__option ${filter === activeSort ? 'places__option--active' : ''}`}
                tabIndex={0}
                key={filter}
                onClick={() => {
                  sortingFormChangeHandler(filter);
                }}
              >
                {filter}
              </li>)
            )
        }
      </ul>
    </form>
  );
}

export default SortingOptions;
