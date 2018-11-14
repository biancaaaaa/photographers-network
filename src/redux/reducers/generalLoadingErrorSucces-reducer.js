import {
  ACTION_STARTED,
  ACTION_ERROR,
  ACTION_SUCCES,
  ACTION_RESET
} from "../actions/generalLoadingErrorSucces-actions";

const initialState = {
  loading: false,
  error: null,
  succes: null,
  succesData: null
};

export const generalLoadingErrorSucces = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_RESET:
      return initialState;
    case ACTION_STARTED:
      return {
        ...initialState,
        loading: true
      };
    case ACTION_ERROR:
      return {
        loading: false,
        error: action.error,
        succes: null,
        succesData: null
      };
    case ACTION_SUCCES:
      return {
        loading: false,
        error: null,
        succes: true,
        succesData: action.data
      };
    default:
      return state;
  }
};
