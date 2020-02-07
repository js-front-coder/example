import { handleActions } from 'redux-actions';

import { currencyActions } from './actions';

const initialState = {
    availableCurrencies: {
      DIMO: {
        symbol: 'DIMO',
        label:
          'DIMO',

      }
    },
    activeCurrency: {
      symbol: 'DIMO',
      label:
        'DIMO',
    }
    ,
  }
;

export const currencyReducer = handleActions(
  {
    [currencyActions.setAvailableCurrencies]: (state, { payload }) => {
      return {
        ...state,
        availableCurrencies: payload,
      }
    },
    [currencyActions.setActiveCurrency]: (state, { payload }) => {
      return {
        ...state,
        activeCurrency: payload,
      }
    }
  },
  initialState,
);