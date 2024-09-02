import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { CurrentOffer, Offer } from '../types/offer';
import { redirectToRoute } from './action';
import { AppRoute, APIRoute } from '../const';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user-data.ts';
import { saveToken, dropToken } from '../services/token';
import { Comment, NewComment } from '../types/comment';

export const APIAction = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  FETCH_CURRENT_OFFER: 'FETCH_CURRENT_OFFER',
  FETCH_NEAR_OFFERS: 'FETCH_NEAR_OFFERS',
  FETCH_FAVORITE_OFFERS: 'FETCH_FAVORITE_OFFERS',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  POST_COMMENT: 'POST_COMMENT',
  UPDATE_OFFER_FAVORITE_STATUS: 'UPDATE_OFFER_FAVORITE_STATUS',
};

export const updateOfferFavoriteStatusAction = createAsyncThunk<Offer[], {id: string; favoriteStatus: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.UPDATE_OFFER_FAVORITE_STATUS,
  async ({id, favoriteStatus}, {extra: api}) => {
    const status = favoriteStatus ? 0 : 1;
    await api.post<Offer[]>(`${APIRoute.Favorite}/${id}/${status}`);
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_FAVORITE_OFFERS,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_COMMENTS,
  async (id, {extra: api}) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_OFFERS,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<CurrentOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_CURRENT_OFFER,
  async (id, {extra: api}) => {
    const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const fetchNearOfferAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_NEAR_OFFERS,
  async (id, {extra: api}) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.CHECK_AUTH,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGIN,
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGOUT,
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const postCommentAction = createAsyncThunk<Comment | void, NewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  APIAction.POST_COMMENT,
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  }
);

