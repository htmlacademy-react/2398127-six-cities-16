import { Offer } from '../../types/offer.ts';
import OfferCard from './offer-card.tsx';
import OfferCardFavorite from './offer-card-favorite.tsx';

type OfferCardsProps = {
  offers: Offer[];
  cardClickHandler: (id: string) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  isFavorites: boolean;
}

function OfferCards({offers, cardClickHandler, cardHoverHandler, isFavorites}: OfferCardsProps): JSX.Element {
  if (isFavorites) {
    const filteredOffers = offers.filter((offer) => offer.isFavorite);
    return (
      <div className="favorites__places">
        {
          filteredOffers.map((offer) => <OfferCardFavorite key={offer.id} offer={offer} cardClickHandler={cardClickHandler}/>)
        }
      </div>
    );
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} cardClickHandler={cardClickHandler} cardHoverHandler={cardHoverHandler}/>)}
    </div>
  );
}

export default OfferCards;
