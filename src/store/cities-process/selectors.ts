import { City } from '../../types/offer';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentCity = (state: Pick<State, NameSpace.City>): City =>
  state[NameSpace.City].city;
