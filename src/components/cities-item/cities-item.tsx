import { useAppSelector } from '../../hooks/index.ts';
import { City } from '../../types/offer.ts';
import { getCurrentCity } from '../../store/cities-process/selectors.ts';

type CitiesItemProps = {
  city: City;
  cityClickHandler: (city: City) => void;
}

function CitiesItem({city, cityClickHandler}: CitiesItemProps): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  return (
    <li className="locations__item" key={city.name} onClick={() => {
      cityClickHandler(city);
    }}
    >
      <a className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active' : ''}`} href="#">
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CitiesItem;
