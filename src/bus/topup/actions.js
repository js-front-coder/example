import { createActions } from 'redux-actions';

export const topupActions = createActions({
  //Sync
  FILL_EXCHANGE_TOPUP: value => value,
  FILL_METHODS_TOPUP: data => data,
  FILL_MERCHANTS_TOPUP: data => data,
  SET_TOPUP_CURRENCY: currency => currency,
  RESET_STORE: void 0,


  //Async
  GET_MERCHANTS_ASYNC: void 0,
  TOPUP_EXCHANGE_ASYNC: value => value,
  TOPUP_METHODS_ASYNC: void 0,
  TOPUP_PAYMENT_ASYNC: (data, goto) => {return{data, goto}},
});
