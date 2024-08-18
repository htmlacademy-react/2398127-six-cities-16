import { Comment } from '../types/comment.ts';

export const comments: Comment[] = [
  {
    id: '1',
    date: new Date('2024-01-01T15:00:00.536Z'),
    rating: 3,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    user: {
      name: 'Max',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false
    }
  },
  {
    id: '2',
    date: new Date('2024-01-02T16:00:00.536Z'),
    rating: 3,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user: {
      name: 'Dan',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: false
    }
  },
  {
    id: '2',
    date: new Date('2024-01-03T17:00:00.536Z'),
    rating: 3,
    comment: 'Mauris eros magna, lobortis ac egestas et, venenatis at mi.',
    user: {
      name: 'Robb',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: false
    }
  }
];
