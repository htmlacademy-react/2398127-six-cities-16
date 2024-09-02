import { Offer } from '../../types/offer.ts';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, STARS } from '../../const.ts';
import { store } from '../../store/index.ts';
import { updateOfferFavoriteStatusAction } from '../../store/api-actions.ts';
import { setError } from '../../store/errors-process/errors-process.ts';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/index.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';

type OfferCardProps = {
  offer: Offer;
  cardClickHandler: (offer: Offer) => void;
  cardHoverHandler: (offerElement: Offer) => void;
}

function OfferCard({offer, cardClickHandler, cardHoverHandler}: OfferCardProps): JSX.Element {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const ratingScale = rating * 100 / STARS.length;
  const favoriteButtonClickHandler = () => {
    try {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        setIsUpdating(true);
        store.dispatch(updateOfferFavoriteStatusAction({id: offer.id, favoriteStatus}));
        setFavoriteStatus(!favoriteStatus);
      } else {
        navigate(AppRoute.Login);
      }
    } catch (err) {
      setError('Cant update status');
    } finally {
      setIsUpdating(false);
    }
  };

  return(
    <article className="cities__card place-card" id={`offer-${id}`}
      onClick={() => {
        cardClickHandler(offer);
      }}
      onMouseEnter={() => cardHoverHandler(offer)}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button
            ${isFavorite ?
      'place-card__bookmark-button--active'
      : ''}`} type="button"
          onClick={favoriteButtonClickHandler}
          disabled={isUpdating}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${ratingScale}%`
              }}
            >
            </span>
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

export default OfferCard;
