import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers.ts';
import { Cities, Sorts } from '../const.ts';
import { changeCity, loadOffers, changeSorting, closeSorting, openSorting, resetSorting } from './action.ts';
import { sort } from '../utils.ts';

const initialState = {
  city: Cities.PARIS,
  offers: offers,
  sort: Sorts.POPULAR,
  isFiltersOpen: false
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
      state.offers = sort[action.payload]([...offers]);
    })
    .addCase(openSorting, (state) => {
      state.isFiltersOpen = true;
    })
    .addCase(closeSorting, (state) => {
      state.isFiltersOpen = false;
    })
    .addCase(resetSorting, (state) => {
      state.sort = Sorts.POPULAR;
    });
});

export { reducer };
