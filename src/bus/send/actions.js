import { createActions } from 'redux-actions';

export const sendActions = createActions({
  //Sync
  OPEN_SUCCESS_MODAL: void 0,
  CLOSE_SUCCESS_MODAL: void 0,
  FILL_SEND: balance => balance,
    FILL_HISTORY: data => data,
  SET_VALUE_SLIDER: value => value,

  //ASYNC
  SEND_ASYNC: (data, next) => {return {dataSend: data, next}},
    GET_HISTORY_ASYNC: void 0
});
