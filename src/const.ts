
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

export const Cities = {
  PARIS: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  COLOGNE: {
    name: 'Cologne',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 13
    }
  },
  BRUSSELS: {
    name: 'Brussels',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 13
    }
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 13
    }
  },
  HAMBURG: {
    name: 'Hamburg',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 13
    }
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 13
    }
  }
};

export const OffersClassName = {
  DEFAULT: 'cities__places-list places__list tabs__content',
  NEAR: 'near-places__list places__list'
};
