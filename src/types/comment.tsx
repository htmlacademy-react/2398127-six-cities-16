export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Comment = {
  id: string;
  date: Date;
  rating: number;
  comment: string;
  user: User;
}
