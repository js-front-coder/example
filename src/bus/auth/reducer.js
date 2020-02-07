import { handleActions } from 'redux-actions';

import { authActions } from './actions';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token || false,
  errorMessageForgotPassword: '',
  errorMessageLogin: '',
  errorMessageSignUp: '',
  statusModalEmail: false,
  errorReset: {
    statusModalReset: false,
    responseStatus: null
  },
  loaderModalStatus: false,
};

export const authReducer = handleActions(
  {
    [authActions.authenticate]: state => {
      return {
        ...state,
        isAuthenticated: true,
        errorMessageForgotPassword: '',
        errorMessageLogin: ''
      };
    },

    [authActions.logout]: state => {
      return {
        ...state,
        isAuthenticated: false,
        errorMessageForgotPassword: '',
        errorMessageLogin: ''
      };
    },

    [authActions.openInboxModal]: state => {
      return {
        ...state,
        statusModalEmail: true
      };
    },

    [authActions.closeInboxModal]: state => {
      return {
        ...state,
        statusModalEmail: false
      };
    },
    [authActions.handleForgotPasswordError]: (
      state,
      { payload: { message } }
    ) => {
      return {
        ...state,
        errorMessageForgotPassword: message
      };
    },
    [authActions.handleLoginError]: (state, { payload: { message } }) => {
      return {
        ...state,
        errorMessageLogin: message
      };
    },
    [authActions.handleSignUpError]: (state, { payload: { message } }) => {
      return {
        ...state,
        errorMessageSignUp: message
      };
    },
    [authActions.openResetPasswordModal]: (state, { payload: { status } }) => {
      return {
        ...state,
        errorReset: {
          ...state.errorReset,
          statusModalReset: true,
          responseStatus: status
        }
      };
    },
    [authActions.closeResetPasswordModal]: state => {
      return {
        ...state,
        errorReset: {
          ...state.errorReset,
          statusModalReset: false,
          responseStatus: null
        }
      };
    },
    [authActions.openLoaderModal]: state => {
      return {
        ...state,
        loaderModalStatus: true,
      }
    },
    [authActions.closeLoaderModal]: state => {
      return {
        ...state,
        loaderModalStatus: false,
      }
    }
  },
  initialState
);
