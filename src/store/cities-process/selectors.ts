import { City } from '../../types/offer';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentCity = (state: State): City =>
  state[NameSpace.City].city;
