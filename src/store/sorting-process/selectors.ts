import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOpenedStatus = (state: Pick<State, NameSpace.Sort>) => state[NameSpace.Sort].isFiltersOpen;
