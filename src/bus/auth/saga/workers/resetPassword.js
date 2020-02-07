import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

export function* resetPassword({ payload: data }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.auth.resetPassword, [data]);
    const { message } = yield apply(responce, responce.json);

    if (
      responce.status !== 200 &&
      responce.status !== 400 &&
      responce.status !== 401
    ) {
      throw new Error(message);
    }

    if (responce.status === 401) {
      yield put(
        authActions.openResetPasswordModal({ status: responce.status })
      );
    } else if (responce.status === 400) {
      yield put(
        authActions.openResetPasswordModal({ status: responce.status })
      );
    } else {
      history.push(book.login);
    }
  } catch (error) {
    yield put(uiActions.emitError(error, 'resetPassword worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
