import { createAction } from '@reduxjs/toolkit';
import { City, Offer, CurrentOffer } from '../types/offer';
import {AuthorizationStatus, AppRoute} from '../const';
import { UserData } from '../types/user-data';
import { Comment } from '../types/comment';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  LOAD_OFFERS: 'FILL_OFFERS',
  LOAD_NEAR_OFFERS: 'LOAD_NEAR_OFFERS',
  CHANGE_SORTING: 'CHANGE_SORTING',
  OPEN_SORTING: 'OPEN_SORTING',
  CLOSE_SORTING: 'CLOSE_SORTING',
  RESET_SORTING: 'RESET_SORTING',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  CHANGE_OFFERS_LOADING_STATUS: 'CHANGE_OFFERS_LOADING_STATUS',
  SET_ERROR: 'SET_ERROR',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  LOAD_USER_DATA: 'LOAD_USER_DATA',
  LOAD_CURRENT_OFFER: 'LOAD_CURRENT_OFFER',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  LOAD_FAVORITE_OFFERS: 'LOAD_FAVORITE_OFFERS',
  LOAD_NEW_COMMENT: 'LOAD_NEW_COMMENT'
};

export const changeCity = createAction(Action.CHANGE_CITY, (selectedCity: City) => ({
  payload: selectedCity
}));
export const loadNewComment = createAction<Comment | null>(Action.LOAD_NEW_COMMENT);
export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);
export const loadCurrentOffer = createAction<CurrentOffer>(Action.LOAD_CURRENT_OFFER);
export const loadNearOffers = createAction<Offer[]>(Action.LOAD_NEAR_OFFERS);
export const loadComments = createAction<Comment[]>(Action.LOAD_COMMENTS);
export const loadFavoriteOffers = createAction<Offer[]>(Action.LOAD_FAVORITE_OFFERS);
export const changeSorting = createAction(Action.CHANGE_SORTING, (currentFilter: string) => ({
  payload: currentFilter
}));
export const openSorting = createAction(Action.OPEN_SORTING);
export const closeSorting = createAction(Action.CLOSE_SORTING);
export const resetSorting = createAction(Action.RESET_SORTING);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTH);
export const changeOffersLoadingStatus = createAction<boolean>(Action.CHANGE_OFFERS_LOADING_STATUS);
export const setError = createAction<string | null>(Action.SET_ERROR);
export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
export const loadUserData = createAction<UserData>(Action.LOAD_USER_DATA);
