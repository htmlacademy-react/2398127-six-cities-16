import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../../components/comments/comments.tsx';
import OfferCards from '../../components/offer-card/offer-cards';
import Map from '../../components/map/map.tsx';
import { AppRoute, AuthorizationStatus, OffersClassName, STARS } from '../../const.ts';
import { store } from '../../store/index.ts';
import Header from '../../components/header/header.tsx';
import Loader from '../../components/loader/loader.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearOfferAction, updateOfferFavoriteStatusAction } from '../../store/api-actions.ts';
import { useEffect, useState } from 'react';
import PageNotFound from '../page-not-found/page-not-found.tsx';
import { getCurrentCity } from '../../store/cities-process/selectors.ts';
import { getCurrentOffer, getNearOffers, getOffersLoadingStatus } from '../../store/offer-data/selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';

type OfferPageProps = {
  selectedCard: Offer | undefined;
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
}
function OfferPage({selectedCard, cardClickHandler, cardHoverHandler}: OfferPageProps): JSX.Element {
  const { id: currentId } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentId) {
      store.dispatch(fetchCommentsAction(currentId));
      store.dispatch(fetchNearOfferAction(currentId));
      store.dispatch(fetchCurrentOfferAction(currentId));
    }
  }, [currentId]);

  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const currentCity = useAppSelector(getCurrentCity);
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const [favoriteStatus, setFavoriteStatus] = useState(currentOffer?.isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    setFavoriteStatus(currentOffer?.isFavorite);
  }, [currentOffer]);

  if (isOffersLoading) {
    return <Loader />;
  }
  if (currentOffer) {
    const { title, type, price, isPremium, rating, description, goods, host, maxAdults, bedrooms, images, id } = currentOffer;
    const ratingScale = rating * 100 / STARS.length;
    const toggleFavoriteStatusHandler = () => {
      setFavoriteStatus(!favoriteStatus);
      try {
        setIsUpdating(true);
        if (authorizationStatus === AuthorizationStatus.Auth) {
          store.dispatch(updateOfferFavoriteStatusAction({ id, favoriteStatus: favoriteStatus ? favoriteStatus : false }));
        } else {
          navigate(AppRoute.Login);
        }
      } catch (error) {
        setFavoriteStatus(!favoriteStatus);
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <div className="page" data-testid="offerPage">
        <Helmet>
          <title>6 cities. Offer</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((image) => (
                  <div className="offer__image-wrapper" key={id + image}>
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div> : ''}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <button
                    className={`offer__bookmark-button button ${favoriteStatus ? 'offer__bookmark-button--active' : ''}`}
                    type="button"
                    onClick={toggleFavoriteStatusHandler}
                    disabled={isUpdating}
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${ratingScale}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms > 1 ? `${bedrooms} Bedrooms` : `${bedrooms} Bedroom`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good) => (
                      <li className="offer__inside-item" key={id + good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {host.name}
                    </span>
                    {host.isPro
                      ? (
                        <span className="offer__user-status">
                          Pro
                        </span>
                      )
                      : ''}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {description}
                    </p>
                  </div>
                </div>
                <Comments />
              </div>
            </div>
            <section className="offer__map map">
              <Map
                city={currentCity}
                points={nearOffers}
                selectedCard={selectedCard}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferCards
                cardClickHandler={cardClickHandler}
                cardHoverHandler={cardHoverHandler}
                isFavorites={false}
                className={OffersClassName.NEAR}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
  return <PageNotFound />;
}

export default OfferPage;
