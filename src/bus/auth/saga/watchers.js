import { takeEvery, all, call } from 'redux-saga/effects';

import { authActions } from '../actions';

import {
  signUp,
  login,
  authenticate,
  logout,
  forgotPassword,
  resetPassword,
} from './workers';

export function* watchSignUp() {
  yield takeEvery(authActions.signUpAsync, signUp);
}

export function* watchLogin() {
  yield takeEvery(authActions.loginAsync, login);
}

export function* watchAuthenticate() {
  yield takeEvery(authActions.authenticateAsync, authenticate);
}

export function* watchLogout() {
  yield takeEvery(authActions.logoutAsync, logout);
}

export function* watchForgotPassword() {
  yield takeEvery(authActions.forgotPasswordAsync, forgotPassword);
}

export function* watchResetPassword() {
  yield takeEvery(authActions.resetPasswordAsync, resetPassword);
}

export function* watchAuth() {
  yield all([
    call(watchSignUp),
    call(watchLogin),
    call(watchAuthenticate),
    call(watchLogout),
    call(watchForgotPassword),
    call(watchResetPassword)
  ]);
}
