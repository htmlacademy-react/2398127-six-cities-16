import { Helmet } from 'react-helmet-async';
import {Offer, City} from '../../types/offer';
import OfferCards from '../../components/offer-card/offer-cards';
import Map from '../../components/map/map.tsx';
import {OffersClassName, AppRoute} from '../../const.ts';
import { store } from '../../store/index.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import { changeCity, resetSorting } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../components/hooks/index.ts';
import Loader from '../../components/loader/loader.tsx';
import {useNavigate } from 'react-router-dom';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import EmptyOfferCards from '../../components/offer-card/empty-offer-cards.tsx';
import Header from '../../components/header/header.tsx';

type MainProps = {
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  selectedCard: Offer | undefined;
}

function Main({cardClickHandler, cardHoverHandler, selectedCard}: MainProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const currentCity = store.getState().city;
  const cityOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity.name);
  const cityClickHandler = (city: City) => {
    dispatch(changeCity(city));
    dispatch(resetSorting());
    navigate(AppRoute.Root);
  };
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
              ? <EmptyOfferCards currentCity={currentCity}/>
              : (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
                    {
                      isOffersLoading
                        ? <Loader />
                        :
                        <>
                          <SortingOptions />
                          <OfferCards
                            offers={cityOffers}
                            className={OffersClassName.DEFAULT}
                            cardClickHandler={cardClickHandler}
                            cardHoverHandler={cardHoverHandler}
                          />
                        </>
                    }
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
