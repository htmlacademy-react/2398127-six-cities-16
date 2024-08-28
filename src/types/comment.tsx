export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Comment = {
  id: string;
  date: Date;
  rating: number;
  user: User;
  comment: string;
}

export type NewComment = {
  id: string;
  comment: string;
  rating: number;
}
