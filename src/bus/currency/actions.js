import { createActions } from 'redux-actions';

export const currencyActions = createActions({
  //Sync
  SET_AVAILABLE_CURRENCIES: currencies => currencies,
  SET_ACTIVE_CURRENCY: currency => currency,

  //Async
});