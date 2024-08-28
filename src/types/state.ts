import {store} from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { Comment } from './comment.js';
import { CurrentOffer, Offer, City } from './offer.js';
import { UserData } from './user-data.js';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type SortingProcess = {
  isFiltersOpen: boolean;
};

export type OffersData = {
  offers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: CurrentOffer | null;
  nearOffers: Offer[];
  isOffersLoading: boolean;
  sort: string;
};

export type CommentsData = {
  comments: Comment[];
}

export type CitiesProcess = {
  city: City;
};

export type ErrorsProcess = {
  error: string | null;
};
