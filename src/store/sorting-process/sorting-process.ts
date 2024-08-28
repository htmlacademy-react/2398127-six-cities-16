import { NameSpace } from '../../const';
import { SortingProcess } from '../../types/state';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SortingProcess = {
  isFiltersOpen: false
};

export const sortingProcess = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    openSorting: (state) => {
      state.isFiltersOpen = true;
    },
    closeSorting: (state) => {
      state.isFiltersOpen = false;
    }
  }
});

export const { openSorting, closeSorting } = sortingProcess.actions;
