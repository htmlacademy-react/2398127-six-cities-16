import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { store } from '../../store/index.ts';
import { updateOfferFavoriteStatusAction } from '../../store/api-actions.ts';
import { setError } from '../../store/errors-process/errors-process.ts';
import { useState } from 'react';

type OfferCardFavoriteProps = {
  offer: Offer;
  cardClickHandler: (offer: Offer) => void;
}

function OfferCardFavorite({offer, cardClickHandler} : OfferCardFavoriteProps): JSX.Element {
  const {id, title, type, price, previewImage, isFavorite, isPremium} = offer;
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const favoriteButtonClickHandler = () => {
    try {
      setIsUpdating(true);
      store.dispatch(updateOfferFavoriteStatusAction({id: offer.id, favoriteStatus}));
      setFavoriteStatus(!favoriteStatus);
    } catch (err) {
      setError('Cant update status');
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <article className="favorites__card place-card" id={`offer-${id}`}
      onMouseOver={() => {
        cardClickHandler(offer);
      }}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="/">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button
            ${favoriteStatus ? 'place-card__bookmark-button--active' : ''}`} type="button"
          disabled={isUpdating}
          onClick={favoriteButtonClickHandler}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '100%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCardFavorite;
