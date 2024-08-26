import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import {Offer, City} from '../../types/offer';
import OfferCards from '../../components/offer-card/offer-cards';
import Map from '../../components/map/map.tsx';
import {OffersClassName, AppRoute, AuthorizationStatus} from '../../const.ts';
import { store } from '../../store/index.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import { changeCity, resetSorting } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../components/hooks/index.ts';
import Loader from '../../components/loader/loader.tsx';
import {Link, useNavigate } from 'react-router-dom';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import EmptyOfferCards from '../../components/offer-card/empty-offer-cards.tsx';
import { logoutAction } from '../../store/api-actions.ts';

type MainProps = {
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
  selectedCard: Offer | undefined;
}

function Main({cardClickHandler, cardHoverHandler, selectedCard}: MainProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const currentCity = store.getState().city;
  const cityOffers = store.getState().offers.filter((offer) => offer.city.name === currentCity.name);
  const favoriteOffers = store.getState().offers.filter((offer) => offer.isFavorite === true);
  const userData = store.getState().user;
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? (
                      <>
                        <li className="header__nav-item user">
                          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                            <div className="header__avatar-wrapper user__avatar-wrapper">
                            </div>
                            <span className="header__user-name user__name">{userData?.email}</span>
                            <span className="header__favorite-count">{favoriteOffers.length}</span>
                          </Link>
                        </li>
                        <li className="header__nav-item">
                          <Link
                            className="header__nav-link"
                            to={AppRoute.Login}
                            onClick={(evt) => {
                              evt.preventDefault();
                              dispatch(logoutAction());
                            }}
                          >
                            <span className="header__signout">Sign out</span>
                          </Link>
                        </li>
                      </>
                    )
                    : (
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Login}
                        >
                          <span className="header__signout">Sign in</span>
                        </Link>
                      </li>
                    )
                }
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
