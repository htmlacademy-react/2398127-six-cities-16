import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getErrorMessage = (state: Pick<State, NameSpace.Errors>) => state[NameSpace.Errors].error;
