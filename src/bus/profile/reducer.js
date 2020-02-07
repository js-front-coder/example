import { handleActions } from 'redux-actions';

import { profileActions } from './actions';
import { uiActions } from 'bus/ui/actions';
import { sendActions } from 'bus/send/actions';
import { redeemActions } from 'bus/redeem/actions';

const initialState = {
  statusModalAvatar: false,
  statusModalNumber: false,
  statusModalSms: false,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    username: '',
    limits: {
      maxDailyWithdrawLimit: ''
    },
    type: '',
    balances: {},
    avatar: undefined
  },
  updateSuccess: false,
  error: ''
};

export const profileReducer = handleActions(
  {
    [profileActions.fillProfile]: (state, { payload: user }) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...user
        },
        updateProfileSuccess: false,
        error: ''
      };
    },
    [uiActions.emitError]: (state, { payload }) => {
      return {
        ...state,
        error: payload.message
      };
    },
    [profileActions.clearProfile]: state => {
      return {
        ...state,
        statusModalAvatar: false,

        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          address: '',
          username: '',
          limits: {
            maxDailyWithdrawLimit: ''
          },
          type: '',
          balances: {}
        },
        updateProfileSuccess: false,
        error: ''
      };
    },
    [sendActions.fillSend]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          balances: {
            ...state.user.balances,
            DIMO: payload
          }
        }
      };
    },
    [redeemActions.fillPayment]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          balances: {
            ...state.user.balances,
            DIMO: payload
          }
        }
      };
    },
    [profileActions.getBalancesResultFinal]: (state, {payload}) => {

      return {
        ...state,
        user: {
          ...state.user,
          balances: payload,
        }

      };
    },
    [profileActions.openModalAvatar]: state => {
      return {
        ...state,
        statusModalAvatar: true
      };
    },
    [profileActions.closeModalAvatar]: state => {
      return {
        ...state,
        statusModalAvatar: false
      };
    },
    [profileActions.openModalNumber]: state => {
      return {
        ...state,
        statusModalNumber: true
      };
    },
    [profileActions.closeModalNumber]: state => {
      return {
        ...state,
        statusModalNumber: false
      };
    },
    [profileActions.openModalSms]: state => {
      return {
        ...state,
        statusModalSms: true
      };
    },
    [profileActions.closeModalSms]: state => {
      return {
        ...state,
        statusModalSms: false
      };
    },
    [profileActions.fillAvatar]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload
        },
        error: ''
      };
    },
    [profileActions.fillNumber]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          phone: payload
        }
      };
    },
    [profileActions.updateProfileSuccess]: (state) => {
      return {
        ...state,
        updateProfileSuccess: true
      };
    },
    [profileActions.clearProp]: (state, { payload }) => {
      const {key, value = false} = payload;
      return {
        ...state,
        [key]: value
      };
    },
  },
  initialState
);
