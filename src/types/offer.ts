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

