import { City } from './types/offer.ts';
export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferId = ':id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RAITING = [1, 2, 3, 4, 5];

export const UrlMapMarkers = {
  URL_MARKER_DEFAULT:'https://i.imghippo.com/files/NmFSB1721386035.svg',
  URL_MARKER_CURRENT: 'https://i.imghippo.com/files/HgRqu1721386117.svg'
};

export const city: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 13
  }
};

export const OffersClassName = {
  DEFAULT: 'cities__places-list places__list tabs__content',
  NEAR: 'near-places__list places__list'
};
