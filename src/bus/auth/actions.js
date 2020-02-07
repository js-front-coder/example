import { createActions } from 'redux-actions';

export const authActions = createActions({
  //Sync
  AUTHENTICATE: void 0,
  AUTHENTICATE_FAIL: error => error,
  LOGOUT: void 0,
  OPEN_INBOX_MODAL: void 0,
  CLOSE_INBOX_MODAL: void 0,
  OPEN_RESET_PASSWORD_MODAL: void 0,
  CLOSE_RESET_PASSWORD_MODAL: void 0,
  HANDLE_LOGIN_ERROR: error => error,
  HANDLE_SIGN_UP_ERROR: error => error,
  HANDLE_FORGOT_PASSWORD_ERROR: error => error,
  RESET_STORE: void 0,
  OPEN_LOADER_MODAL: void 0,
  CLOSE_LOADER_MODAL: void 0,

  //Async
  LOGIN_ASYNC: credentials => credentials,
  SIGN_UP_ASYNC: credentials => credentials,
  AUTHENTICATE_ASYNC: token => token,
  LOGOUT_ASYNC: token => token,
  FORGOT_PASSWORD_ASYNC: email => email,
  RESET_PASSWORD_ASYNC: credentials => credentials
});
