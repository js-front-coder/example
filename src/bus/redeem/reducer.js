import { handleActions } from 'redux-actions';

import { redeemActions } from './actions';

const initialState = {
  visibleRecept: false,
  getValue: {
    fee: 0,
    get: 0,
    spend: '',
    total: 0,
    currency: 'DIMO'
  },
  dataMethods: []
};

export const redeemReducer = handleActions(
  {
    [redeemActions.fillExchangeRedeem]: (state, { payload: value }) => {
      return {
        ...state,
        getValue: {
          ...state.getValue,
          ...value
        }
      };
    },
    [redeemActions.setRedeemCurrency]: (state, { payload: {currency, getCurrency} }) => {
      console.log('REDEEM CURRENCY', currency, getCurrency);
      return {
        ...state,
        getValue: {
          ...state.getValue,
          currency : currency ? currency : state.getValue.currency,
          getCurrency : getCurrency ? getCurrency : state.getValue.getCurrency
        }
      };
    },
    [redeemActions.fillMethodsRedeem]: (state, { payload: methods }) => {
      return {
        ...state,
        dataMethods: methods
      };
    },
    [redeemActions.resetStore]: (state) => {
      return {
        ...state,
        visibleRecept: false,
        getValue: {
          fee: 0,
          get: 0,
          spend: '',
          total: 0,
          currency: 'DIMO'
        },
        dataMethods: []
      }
    }
  },
  initialState
);
