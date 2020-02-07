import { handleActions } from 'redux-actions';

import { uiActions } from './actions';

const initialState = {
  isFetching: false,
  modalWallet: {
    status: false,
    type: ''
  }
};

export const uiReducer = handleActions(
  {
    [uiActions.startFetching]: state => {
      return {
        ...state,
        isFetching: true
      };
    },
    [uiActions.stopFetching]: state => {
      return {
        ...state,
        isFetching: false
      };
    },
    [uiActions.openModalWallet]: (state, { payload }) => {
      return {
        ...state,
        modalWallet: {
          ...state.modalWallet,
          status: true,
          type: payload
        }
      };
    },
    [uiActions.closeModalWallet]: (state, { payload }) => {
      return {
        ...state,
        modalWallet: {
          ...state.modalWallet,
          status: false,
          type: ''
        }
      };
    }
  },
  initialState
);
