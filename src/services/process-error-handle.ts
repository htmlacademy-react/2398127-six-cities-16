import { TIMEOUT_SHOW_ERROR } from '../const.ts';
import { setError } from '../store/errors-process/errors-process.ts';
import { AppDispatch } from '../types/state.ts';

export const processErrorHandle = (message: string, dispatch: AppDispatch) => {
  dispatch(setError(message));
  setTimeout(
    () => dispatch(setError(null)),
    TIMEOUT_SHOW_ERROR
  );
};
