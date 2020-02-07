import {handleActions} from 'redux-actions';

import {topupActions} from './actions';

const initialState = {
  visibleRecept: false,
  topupParams: {
    fee: 0,
    get: 0,
    spend: 0,
    total: 0,
    currency: '',
  },
  dataMethods: [
    {
      infor: {
        account: 'test account'
      }
    }
  ],
  merchants: []
};

export const topupReducer = handleActions(
  {
    [topupActions.fillExchangeTopup]: (state, {payload: value}) => {
      return {
        ...state,
        topupParams: {
          ...state.topupParams,
          ...value
        }
      };
    },
    [topupActions.setTopupCurrency]: (state, {payload: currency}) => {
      return {
        ...state,
        topupParams: {
          ...state.topupParams,
          currency
        }
      };
    },
    [topupActions.fillMethodsTopup]: (state, {payload: methods}) => {
      return {
        ...state,
        dataMethods: methods
      };
    },
    [topupActions.fillMerchantsTopup]: (state, {payload: merchants}) => {
      return {
        ...state,
        merchants
      };
    },
    //start from this place - need resetTopupParams action*************************************
    [topupActions.resetStore]: state => {
      return {
        ...state,
        visibleRecept: false,
        topupParams: {
          fee: 0,
          get: 0,
          spend: '0',
          total: 0,
          currency: ''
        },
        dataMethods: [],
        merchants: []
      }
    },
  },
  initialState
);
