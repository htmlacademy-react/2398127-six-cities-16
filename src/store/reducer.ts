import { createReducer } from '@reduxjs/toolkit';
import { City, CurrentOffer, Offer } from '../types/offer.ts';
import { Cities, Sorts, AuthorizationStatus } from '../const.ts';
import { loadNewComment,loadFavoriteOffers, loadNearOffers, loadComments, loadCurrentOffer, loadUserData, changeOffersLoadingStatus, requireAuthorization, changeCity, loadOffers, changeSorting, closeSorting, openSorting, resetSorting, setError } from './action.ts';
import { sort } from '../utils.ts';
import { UserData } from '../types/user-data.ts';
import { Comment } from '../types/comment.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  currentOffer: CurrentOffer | null;
  favoriteOffers: Offer[];
  nearOffers: Offer[];
  comments: Comment[];
  newComment: Comment | null;
  user: UserData | null;
  sort: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearOffers: [],
  comments: [],
  newComment: null,
  user: null,
  sort: Sorts.POPULAR,
  isFiltersOpen: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersLoading: false,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sort = action.payload;
      state.offers = sort[action.payload]([...state.offers]);
    })
    .addCase(openSorting, (state) => {
      state.isFiltersOpen = true;
    })
    .addCase(closeSorting, (state) => {
      state.isFiltersOpen = false;
    })
    .addCase(resetSorting, (state) => {
      state.sort = Sorts.POPULAR;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(loadNewComment, (state, action) => {
      state.newComment = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
