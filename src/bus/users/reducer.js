import { handleActions } from 'redux-actions';

import { usersActions } from './actions';

const initialState = {
  numbersOfUsers: [],
};

export const usersReducer = handleActions(
  {
    [usersActions.fillNumberUsers]: (state, { payload }) => {
      return {
        ...state,
        numbersOfUsers: payload,
      };
    },
  },
  initialState,
);
