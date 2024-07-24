export type City = {
  name: string;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
  city: City;
};
