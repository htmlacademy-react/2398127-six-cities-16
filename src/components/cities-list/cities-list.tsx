import { store } from '../../store';
import { Cities } from '../../const.ts';
import { City } from '../../types/offer';

type CitiesListProps = {
  cityClickHandler: (city: City) => void;
}

function CitiesList({cityClickHandler}: CitiesListProps): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities)
        .map((city) => (
          <li className="locations__item" key={city.name} onClick={() => {
            cityClickHandler(city);
          }}
          >
            <a className={`locations__item-link tabs__item ${store.getState().city.name === city.name ? 'tabs__item--active' : ''}`} href="#">
              <span>{city.name}</span>
            </a>
          </li>
        ))}
    </ul>
  );
}

export default CitiesList;
