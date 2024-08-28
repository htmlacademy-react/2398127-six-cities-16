import { useAppSelector } from '../../hooks/index.ts';
import { City } from '../../types/offer.ts';
import { getCurrentCity } from '../../store/cities-process/selectors.ts';

type CitiesItemProps = {
  city: City;
  onCityItemClick: (city: City) => void;
}

function CitiesItem({city, onCityItemClick}: CitiesItemProps): JSX.Element {
  const cityName = useAppSelector(getCurrentCity);
  return (
    <li className="locations__item" key={city.name} onClick={() => {
      onCityItemClick(city);
    }}
    >
      <a className={`locations__item-link tabs__item ${cityName.name === city.name ? 'tabs__item--active' : ''}`} href="#">
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CitiesItem;
