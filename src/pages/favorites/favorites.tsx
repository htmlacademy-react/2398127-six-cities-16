import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OfferCards from '../../components/offer-card/offer-cards';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../const.ts';
import { Offer } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import { store } from '../../store/index.ts';
import { fetchFavoriteOffersAction } from '../../store/api-actions.ts';
import { getFavoriteOffers, getOffersLoadingStatus } from '../../store/offer-data/selectors.ts';
import Loader from '../../components/loader/loader.tsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.tsx';

store.dispatch(fetchFavoriteOffersAction());

type FavoritesProps = {
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
}

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
                                      <Link className="locations__item-link" to="">
                                        <span>{city.name}</span>
                                      </Link>
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
                <Link className="footer__logo-link" to="/">
                  <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
                </Link>
              </footer>
            </>
          )
          : <FavoritesEmpty />
      }
    </div>
  );
}


export default Favorites;
