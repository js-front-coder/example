import { createActions } from 'redux-actions';

export const redeemActions = createActions({
  //Sync
  FILL_EXCHANGE_REDEEM: value => value,
  FILL_METHODS_REDEEM: data => data,
  SET_REDEEM_CURRENCY: (currency, getCurrency) => {return{currency, getCurrency}},
  FILL_PAYMENT: balances => balances,
  RESET_STORE: void 0,

  //Async
  REDEEM_EXCHANGE_ASYNC: value => value,
  REDEEM_METHODS_ASYNC: void 0,
  REDEEM_PAYMENT_ASYNC: data => data
});