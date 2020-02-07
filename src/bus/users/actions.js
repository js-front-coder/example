import { createActions } from 'redux-actions';

export const usersActions = createActions({
  //Sync
  FILL_NUMBER_USERS: numbers => numbers,

  //Async
  FILL_NUMBER_USERS_ASYNC: void 0,
  GET_BALANCES: void 0
});
