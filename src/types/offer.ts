export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
  city: City;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type CurrentOffer = Offer & {
  images: string[];
  description: string;
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
};
