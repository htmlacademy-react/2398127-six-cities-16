import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer.ts';
import { Cities, Sorts, AuthorizationStatus } from '../const.ts';
import { changeOffersLoadingStatus, requireAuthorization, changeCity, loadOffers, changeSorting, closeSorting, openSorting, resetSorting, setError } from './action.ts';
import { sort } from '../utils.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sort: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
