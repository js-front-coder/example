import { handleActions } from 'redux-actions';

import { sendActions } from './actions';

const initialState = {
  status: false,
  valueSlider: 1,
    history: []
};

export const sendReducer = handleActions(
  {
    [sendActions.openSuccessModal]: state => {
      return {
        ...state,
        status: true
      };
    },
    [sendActions.closeSuccessModal]: state => {
      return {
        ...state,
        status: false
      };
    },
    [sendActions.setValueSlider]: (state, { payload }) => {
      return {
        ...state,
        valueSlider: payload
      };
    },
      [sendActions.fillHistory]: (state, { payload: history }) => {
          return {
              ...state,
              history
          };
      }
  },
  initialState
);
