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
