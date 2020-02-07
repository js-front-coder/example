import { handleActions } from 'redux-actions';

import { activityActions } from './actions';

const initialState = {
  data: [],
  page: 1,
  pages: 1,
  infoModal: {
    id: null
  }
};

export const activityReducer = handleActions(
  {
    [activityActions.fillActivity]: (state, { payload }) => {
      return {
        ...state,
        data: payload
      };
    },
    [activityActions.openInfoModal]: (state, { payload }) => {
      return {
        ...state,
        infoModal: {
          ...state.infoModal,
          id: payload
        }
      };
    },
    [activityActions.closeInfoModal]: state => {
      return {
        ...state,
        infoModal: {
          ...state.infoModal,
          id: null
        }
      };
    }
  },
  initialState
);
