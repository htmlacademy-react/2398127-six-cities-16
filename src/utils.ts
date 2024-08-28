import { Sorts } from './const.ts';
import { Offer } from './types/offer.ts';
import { Comment } from './types/comment.tsx';

const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
const sortPriceHighToLow = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
const sortTopRatedFirst = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;

export const sort = {
  [Sorts.POPULAR]: (offers: Offer[]) => offers,
  [Sorts.PRICE_LOW_TO_HIGH]: (offers: Offer[]) => offers.sort(sortPriceLowToHigh),
  [Sorts.PRICE_HIGH_TO_LOW]: (offers: Offer[]) => offers.sort(sortPriceHighToLow),
  [Sorts.TOP_RATED_FIRST]: (offers: Offer[]) => offers.sort(sortTopRatedFirst)
};

function isValidComment(comment: object): comment is Comment {
  return (
    comment !== null &&
    typeof comment === 'object' &&
    'id' in comment &&
    'rating' in comment &&
    'comment' in comment &&
    'date' in comment &&
    'user' in comment
  );
}

export function convertToComment(comment: object): Comment | null {
  if (isValidComment(comment)) {
    return comment;
  } else {
    return null;
  }
}
