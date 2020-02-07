import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

export function* signUp({ payload: credentials }) {
  try {
    yield put(uiActions.startFetching());
    yield put(authActions.openLoaderModal());

    const response = yield apply(api, api.auth.signup, [credentials]);
    const { data, message, phone } = yield apply(response, response.json);

    if (response.status !== 200) {
      console.log(message, phone);
      throw new Error(message);
    }

    yield apply(localStorage, localStorage.setItem, ['token', data.token]);


    yield put(authActions.authenticate());
  } catch (error) {
    console.log(error);
    yield put(uiActions.emitError(error, 'signUp worker'));
    yield put(authActions.handleSignUpError(error));
  } finally {
    yield put(authActions.closeLoaderModal());
    yield put(uiActions.stopFetching());
  }
}
