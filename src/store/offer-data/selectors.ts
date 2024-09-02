import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offers;
export const getFavoriteOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].favoriteOffers;
export const getCurrentOffer = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].currentOffer;
export const getNearOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].nearOffers;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOffersLoading;
export const getActiveSorting = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].sort;
