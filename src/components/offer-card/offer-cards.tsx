import { useAppSelector } from '../../hooks/index.ts';
import { getOffers } from '../../store/offer-data/selectors.ts';
import { getCurrentCity } from '../../store/cities-process/selectors.ts';
import { Offer } from '../../types/offer.ts';
import OfferCard from './offer-card.tsx';
import OfferCardFavorite from './offer-card-favorite.tsx';

type OfferCardsProps = {
  favoriteOffers?: Offer[];
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  isFavorites?: boolean;
  className?: string;
}

function OfferCards({favoriteOffers, cardClickHandler, cardHoverHandler, isFavorites, className}: OfferCardsProps): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffers).filter((offer) => offer.city.name === currentCity.name);
  if (isFavorites && favoriteOffers) {
    return (
      <div className="favorites__places">
        {
          favoriteOffers.map((offer) => <OfferCardFavorite key={offer.id + offer.title} offer={offer} cardClickHandler={cardClickHandler}/>)
        }
      </div>
    );
  }
  return (
    <div
      className={className}
    >
      {offers.map((offer) => (
        <OfferCard
          key={offer.id + offer.title}
          offer={offer}
          cardClickHandler={cardClickHandler}
          cardHoverHandler={cardHoverHandler}
        />
      ))}
    </div>
  );
}

export default OfferCards;
