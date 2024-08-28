import { Cities } from '../../const.ts';
import { City } from '../../types/offer';
import CitiesItem from '../cities-item/cities-item';

type CitiesListProps = {
  cityClickHandler: (city: City) => void;
}

function CitiesList({cityClickHandler}: CitiesListProps): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities)
        .map((city) => (
          <CitiesItem city={city} onCityItemClick={cityClickHandler} key={city.name}/>
        ))}
    </ul>
  );
}

export default CitiesList;
