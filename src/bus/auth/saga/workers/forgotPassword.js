import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

export function* forgotPassword({ payload: email }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.auth.forgotPassword, [email]);
    const { message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }
    yield put(authActions.openInboxModal());
  } catch (error) {
    yield put(uiActions.emitError(error, 'forgotPassword worker'));
    yield put(authActions.handleForgotPasswordError(error));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
