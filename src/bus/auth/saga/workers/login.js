import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

export function* login({ payload: credentials }) {
  try {
    yield put(uiActions.startFetching());
    yield put(authActions.openLoaderModal());

    const responce = yield apply(api, api.auth.login, [credentials]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    yield apply(localStorage, localStorage.setItem, ['token', data.token]);

    yield put(authActions.authenticate());
  } catch (error) {
    yield put(uiActions.emitError(error, 'login worker'));
    yield put(authActions.handleLoginError(error));
  } finally {
    yield put(authActions.closeLoaderModal());
    yield put(uiActions.stopFetching());
  }
}
