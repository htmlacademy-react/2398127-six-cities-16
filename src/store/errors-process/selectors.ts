import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getErrorMessage = (state: State) => state[NameSpace.Errors].error;
