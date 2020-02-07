import { handleActions } from 'redux-actions';

import { walletsActions } from './actions';

const initialState = {
  transfer: {
      from: '',
      to: '',
      quantity: 0,
      spend: 0,
      get: 0
  },
  charts: ''
};

export const walletsReducer = handleActions(
  {
    [walletsActions.setTransfer]: (state, { payload }) => {
      return {
        ...state,
          transfer: payload,
      };
    },
    [walletsActions.resultTransfer]: (state, { payload }) => {
      return {
        ...state,
        transfer: {
          ...state.transfer,
          get: payload.get,
        }
      };
    },
    [walletsActions.fillCharts]: (state, { payload }) => {
      return {
        ...state,
        charts: payload
      }
    }
  },
  initialState,
);
