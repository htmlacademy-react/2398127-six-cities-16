import { Helmet } from 'react-helmet-async';
import {Offer, City} from '../../types/offer';
import OfferCards from '../../components/offer-card/offer-cards';
import Map from '../../components/map/map.tsx';
import {OffersClassName, AppRoute} from '../../const.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import Loader from '../../components/loader/loader.tsx';
import {useNavigate } from 'react-router-dom';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import OfferCardsEmpty from '../../components/offer-card/offer-cards-empty.tsx';
import Header from '../../components/header/header.tsx';
import { changeCity } from '../../store/cities-process/cities-process.ts';
import { getCurrentCity } from '../../store/cities-process/selectors.ts';
import { getOffers, getOffersLoadingStatus } from '../../store/offer-data/selectors.ts';
import { closeSorting } from '../../store/sorting-process/sorting-process.ts';
import { resetSorting } from '../../store/offer-data/offer-data.ts';

type MainProps = {
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  selectedCard: Offer | undefined;
}

function Main({cardClickHandler, cardHoverHandler, selectedCard}: MainProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const currentCity = useAppSelector(getCurrentCity);
  const cityOffers = useAppSelector(getOffers).filter((offer) => offer.city.name === currentCity.name);
  const cityClickHandler = (city: City) => {
    dispatch(changeCity(city));
    dispatch(resetSorting());
    dispatch(closeSorting());
    navigate(AppRoute.Root);
  };

  if (isOffersLoading) {
    return <Loader />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cityClickHandler={cityClickHandler}/>
          </section>
        </div>
        <div className="cities">
          {
            cityOffers.length === 0
              ? <OfferCardsEmpty currentCity={currentCity}/>
              : (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
                    <SortingOptions />
                    <OfferCards
                      className={OffersClassName.DEFAULT}
                      cardClickHandler={cardClickHandler}
                      cardHoverHandler={cardHoverHandler}
                    />
                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">
                      <Map
                        city={currentCity}
                        points={cityOffers}
                        selectedCard={selectedCard}
                      />
                    </section>
                  </div>
                </div>
              )
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
