import { Link } from 'react-router-dom';
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
    <li className="locations__item" key={city.name}
      data-testid='citiesItem'
    >
      <Link className={`locations__item-link tabs__item ${cityName.name === city.name ? 'tabs__item--active' : ''}`} to="/" onClick={() => {
        onCityItemClick(city);
      }}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default CitiesItem;
