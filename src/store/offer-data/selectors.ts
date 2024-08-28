import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;
export const getFavoriteOffers = (state: State) => state[NameSpace.Offers].favoriteOffers;
export const getCurrentOffer = (state: State) => state[NameSpace.Offers].currentOffer;
export const getOffersNearby = (state: State) => state[NameSpace.Offers].offersNearby;
export const getOffersLoadingStatus = (state: State) => state[NameSpace.Offers].isOffersLoading;
export const getActiveSorting = (state: State) => state[NameSpace.Offers].sort;
