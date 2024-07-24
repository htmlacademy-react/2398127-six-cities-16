import { Offer } from '../../types/offer.ts';
import OfferCard from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
}

function OfferCards({offers}: OfferCardsProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default OfferCards;
