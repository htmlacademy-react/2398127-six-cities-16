import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { CurrentOffer, Offer } from '../types/offer';
import { loadFavoriteOffers, loadNearOffers, loadNewComment, loadComments, loadCurrentOffer, loadUserData, loadOffers, redirectToRoute, changeOffersLoadingStatus, requireAuthorization, setError } from './action';
import { AppRoute, APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user-data.ts';
import { saveToken, dropToken } from '../services/token';
import { store } from './';
import { Comment } from '../types/comment';
import { useNavigate } from 'react-router-dom';

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

export const updateOfferFavoriteStatusAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.UPDATE_OFFER_FAVORITE_STATUS,
  async ({isFavorite, id}, {extra: api}) => {
    const status = isFavorite ? 0 : 1;
    await api.post(`${APIRoute.Favorite}/${id}/${status}`);
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeOffersLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(changeOffersLoadingStatus(false));
    dispatch(loadFavoriteOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_COMMENTS,
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeOffersLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(changeOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_CURRENT_OFFER,
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(changeOffersLoadingStatus(true));
      const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);
      dispatch(changeOffersLoadingStatus(false));
      dispatch(loadCurrentOffer(data));
    } catch {
      const navigate = useNavigate();
      navigate('*');
    }
  }
);

export const fetchNearOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_NEAR_OFFERS,
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.CHECK_AUTH,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGIN,
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(loadUserData(data));
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGOUT,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const postCommentAction = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  APIAction.POST_COMMENT,
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    try {
      await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
      dispatch(loadNewComment(data[data.length - 1]));
    } catch {
      dispatch(loadNewComment(null));
    }
  }
);

export const clearErrorAction = createAsyncThunk(
  APIAction.CLEAR_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
