import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { useParams } from 'react-router-dom';
import CommentList from '../../components/comments/comments-list';
import OfferCards from '../../components/offer-card/offer-cards';
import Map from '../../components/map/map.tsx';
import { Cities, OffersClassName, STARS } from '../../const.ts';
import { store } from '../../store/index.ts';
import PageNotFound from '../page-not-found/page-not-found.tsx';

type OfferPageProps = {
  selectedCard: Offer | undefined;
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
}
function OfferPage({selectedCard, cardClickHandler, cardHoverHandler}: OfferPageProps): JSX.Element {
  const { id: currentId } = useParams();
  const offers = store.getState().offers;
  const currentOffer = store.getState().currentOffer;
  const offer: Offer | undefined = offers.find((element) => element.id === currentId);
  const nearOffers = offers.filter((offerElement) => offerElement.id !== offer?.id);
  const cityOffers = offers.filter((offerElement) =>
    offerElement.id !== offer?.id && offerElement.city.name === offer?.city.name);
  if (currentOffer) {
    const { title, type, price, isFavorite, isPremium, rating, description, goods, host, maxAdults, bedrooms, images, id } = currentOffer;
    const ratingScale = rating * 100 / STARS.length;
    return(
      <div className="page">
        <Helmet>
          <title>6 cities — Offer</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

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
                  <button className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
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
                <CommentList offer={currentOffer}/>
              </div>
            </div>
            <section className="offer__map map">
              <Map
                city={Cities.AMSTERDAM}
                points={nearOffers}
                selectedCard={selectedCard}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferCards
                offers={cityOffers}
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
