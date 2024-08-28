import { CitiesProcess } from '../../types/state';
import { City } from '../../types/offer';
import { Cities, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: CitiesProcess = {
  city: Cities.PARIS
};

export const citiesProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = citiesProcess.actions;
