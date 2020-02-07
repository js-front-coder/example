import { createActions } from 'redux-actions';

export const walletsActions = createActions({
  //Sync
  SET_TRANSFER: transfer => transfer,
  RESULT_TRANSFER: result => result,
  //async
  ASYNC_EXCHANGE: configs => configs,
  GET_CHARTS: data => data,
  FILL_CHARTS: data => data
});
