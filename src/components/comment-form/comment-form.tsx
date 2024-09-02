/* eslint-disable react-refresh/only-export-components */
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { AppRoute, StarNames } from '../../const';
import { NewComment } from '../../types/comment';
import { getCurrentOffer } from '../../store/offer-data/selectors';

type CommentFormProps = {
  formSubmitHandler: (commentInfo: NewComment) => Promise<void>;
}

function CommentForm({formSubmitHandler}: CommentFormProps) {
  const currentOffer = useAppSelector(getCurrentOffer);
  const [commentData, setCommentData] = useState({
    id: currentOffer?.id,
    rating: 0,
    comment: 'Very bad'
  } as NewComment);

  useEffect(() => {
    const clearInputs = () => {
      setCommentData({
        ...commentData,
        rating: 0,
        comment: ''
      });
    };

    clearInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.target;
    if (currentOffer) {
      setCommentData({
        ...commentData,
        comment: value
      });
    }
  };

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (currentOffer) {
      setCommentData({
        ...commentData,
        rating: value
      });
    }
  };

  return (
    <form className="reviews__form form" method="post" action={`${AppRoute.Offer}/${currentOffer?.id}`}
      onSubmit={(evt) => {
        evt.preventDefault();
        formSubmitHandler(commentData);
        setCommentData({
          ...commentData,
          rating: 0,
          comment: ''
        });
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(StarNames).map((star) => (
          <Fragment key={star[0]}>
            <input className="form__rating-input visually-hidden" name="rating" value={star[0]} id={`${star[0]}-stars`} type="radio"
              onChange={ratingChangeHandler} checked={commentData.rating === Number(star[0])}
            />
            <label htmlFor={`${star[0]}-stars`} className="reviews__rating-label form__rating-label" title={star[1]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>)
        ).reverse()}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="comment"
        placeholder={'...'}
        onChange={textChangeHandler}
        value={commentData.comment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
