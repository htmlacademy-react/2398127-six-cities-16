import { Offer } from '../../types/offer.ts';
import OfferCard from './offer-card.tsx';
import OfferCardFavorite from './offer-card-favorite.tsx';

type OfferCardsProps = {
  offers: Offer[];
  offerMouseOverHandler: (id: string) => void;
  isFavorites: boolean;
}

function OfferCards({offers, offerMouseOverHandler, isFavorites}: OfferCardsProps): JSX.Element {
  if (isFavorites) {
    const filteredOffers = offers.filter((offer) => offer.isFavorite);
    return (
      <div className="favorites__places">
        {
          filteredOffers.map((offer) => <OfferCardFavorite key={offer.id} offer={offer} offerMouseOverHandler={offerMouseOverHandler}/>)
        }
      </div>
    );
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} offerMouseOverHandler={offerMouseOverHandler}/>)}
    </div>
  );
}

export default OfferCards;
