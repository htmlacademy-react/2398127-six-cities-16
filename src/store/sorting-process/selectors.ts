import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOpenedStatus = (state: State) => state[NameSpace.Sort].isFiltersOpen;
