import { createActions } from 'redux-actions';

export const uiActions = createActions({
  //Sync
  START_FETCHING: void 0,
  STOP_FETCHING: void 0,
  EMIT_ERROR: error => error,

  OPEN_MODAL_WALLET: type => type,
  CLOSE_MODAL_WALLET: void 0
});
