import { handleActions } from 'redux-actions';

const initialState = {
  status: false
};

export const verificationReducer = handleActions(
  {
    // [verificationActions.fillSelfie]: (state, { payload }) => {
    //   return {
    //     ...state,
    //     status: !state.status
    //   };
    // }
  },
  initialState
);
