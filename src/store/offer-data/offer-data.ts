import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Sorts } from '../../const';
import { sort } from '../../utils.ts';
import { OffersData } from '../../types/state';
import { fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearOfferAction, fetchOffersAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearOffers: [],
  isOffersLoading: false,
  sort: Sorts.POPULAR
};

export const offerData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSorting: (state, action: PayloadAction<string>) => {
      state.offers = sort[action.payload]([...state.offers]);
      state.sort = action.payload;
    },
    resetSorting: (state) => {
      state.sort = Sorts.POPULAR;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchNearOfferAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  }
});

export const { changeSorting, resetSorting } = offerData.actions;
