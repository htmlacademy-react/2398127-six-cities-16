import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { offerData } from './offer-data/offer-data';
import { commentsData } from './comments-data/comments.data';
import { sortingProcess } from './sorting-process/sorting-process';
import { citiesProcess } from './cities-process/cities-process';
import { errorsProcess } from './errors-process/errors-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offerData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Sort]: sortingProcess.reducer,
  [NameSpace.City]: citiesProcess.reducer,
  [NameSpace.Errors]: errorsProcess.reducer
});
