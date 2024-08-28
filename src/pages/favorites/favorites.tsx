import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../const.ts';
import { Offer } from '../../types/offer.ts';
import { store } from '../../store/index.ts';
import { fetchFavoriteOffersAction } from '../../store/api-actions.ts';
import { getFavoriteOffers, getOffersLoadingStatus } from '../../store/offer-data/selectors.ts';
import Loader from '../../components/loader/loader.tsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';
import Header from '../../components/header/header.tsx';
import OfferCards from '../../components/offer-card/offer-cards';

type FavoritesProps = {
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
}

store.dispatch(fetchFavoriteOffersAction());

function Favorites({cardClickHandler, cardHoverHandler}: FavoritesProps): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  if (isOffersLoading) {
    return <Loader />;
  }
  return(
    <div className="page">
      <Helmet>
        <title>6 cities — Favorites</title>
      </Helmet>
      <Header />
      {
        favoriteOffers.length !== 0
          ? (
            <>
              <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                  <section className="favorites">
                    <h1 className="favorites__title">Saved listing</h1>
                    {favoriteOffers.length !== 0
                      ? (
                        <ul className="favorites__list">
                          {Object.values(Cities).map((city) => {
                            const favoriteOffersInCity = favoriteOffers.filter((offer) => offer.city.name === city.name);
                            if (favoriteOffersInCity.length) {
                              return (
                                <li className="favorites__locations-items" key={city.name}>
                                  <div className="favorites__locations locations locations--current">
                                    <div className="locations__item">
                                      <a className="locations__item-link" href="#">
                                        <span>{city.name}</span>
                                      </a>
                                    </div>
                                  </div>
                                  <OfferCards
                                    favoriteOffers={favoriteOffersInCity}
                                    cardClickHandler={cardClickHandler}
                                    cardHoverHandler={cardHoverHandler}
                                    isFavorites
                                  />
                                </li>
                              );
                            }
                          })}
                        </ul>
                      )
                      : ''}

                  </section>
                </div>
              </main>
              <footer className="footer container">
                <a className="footer__logo-link" href="main.html">
                  <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
                </a>
              </footer>
            </>
          )
          : <FavoritesEmpty />
      }
    </div>
  );
}


export default Favorites;
