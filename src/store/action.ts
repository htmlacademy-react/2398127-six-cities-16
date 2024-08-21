import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS: 'FILL_OFFERS',
  CHANGE_SORTING: 'CHANGE_SORTING',
  OPEN_SORTING: 'OPEN_SORTING',
  CLOSE_SORTING: 'CLOSE_SORTING',
  RESET_SORTING: 'RESET_SORTING'
};

export const changeCity = createAction(Action.CHANGE_CITY, (selectedCity: City) => ({
  payload: selectedCity
}));
export const fillOffers = createAction(Action.FILL_OFFERS, (currentOffers: Offer[]) => ({
  payload: currentOffers
}));
export const changeSorting = createAction(Action.CHANGE_SORTING, (currentFilter: string) => ({
  payload: currentFilter
}));
export const openSorting = createAction(Action.OPEN_SORTING);
export const closeSorting = createAction(Action.CLOSE_SORTING);
export const resetSorting = createAction(Action.RESET_SORTING);
