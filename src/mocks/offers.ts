import { Offer } from '../types/offer.ts';
export const offers: Offer [] = [
  {
    id: '1',
    title: 'Beautiful studio at great location',
    type: 'apartment',
    price: 425,
    image: 'https://16.design.htmlacademy.pro/static/hotel/1.jpg',
    rating: 4,
    isFavorite: true,
    isPremium: true,
    city: {
      name: 'Paris',
    },
  },

  {
    id: '2',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'room',
    price: 322,
    image: 'https://16.design.htmlacademy.pro/static/hotel/14.jpg',
    rating: 3,
    isFavorite: false,
    isPremium: true,
    city: {
      name: 'Paris',
    },
  },

  {
    id: '3',
    title: 'The Joshua Tree House',
    type: 'hotel',
    price: 500,
    image: 'https://16.design.htmlacademy.pro/static/hotel/17.jpg',
    rating: 2,
    isFavorite: false,
    isPremium: false,
    city: {
      name: 'Paris',
    },
  },

  {
    id: '4',
    title: 'Loft Studio in the Central Area',
    type: 'house',
    price: 200,
    image: 'https://16.design.htmlacademy.pro/static/hotel/16.jpg',
    rating: 5,
    isFavorite: true,
    isPremium: false,
    city: {
      name: 'Paris',
    },
  },
];
