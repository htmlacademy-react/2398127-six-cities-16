import { Offer } from '../../types/offer.ts';
import OfferCard from './offer-card.tsx';
import OfferCardFavorite from './offer-card-favorite.tsx';

type OfferCardsProps = {
  offers: Offer[];
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  isFavorites?: boolean;
  className?: string;
}

function OfferCards({offers, cardClickHandler, cardHoverHandler, isFavorites, className}: OfferCardsProps): JSX.Element {
  if (isFavorites) {
    const filteredOffers = offers.filter((offer) => offer.isFavorite);
    return (
      <div className="favorites__places">
        {
          filteredOffers.map((offer) => <OfferCardFavorite key={offer.id + offer.title} offer={offer} cardClickHandler={cardClickHandler}/>)
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
