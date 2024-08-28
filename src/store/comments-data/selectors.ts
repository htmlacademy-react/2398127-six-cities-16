import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';
import { State } from '../../types/state';

export const getComments = (state: State): Comment[] =>
  state[NameSpace.Comments].comments;
