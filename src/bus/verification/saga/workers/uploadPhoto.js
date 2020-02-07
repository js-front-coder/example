import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

export function* uploadPhoto({ payload: { data: photo, page } }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.verification.uploadPhoto, [
      { data: photo }
    ]);

    const { message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    if (
      responce.status === 200 &&
      (page === 'certificate' || page === 'passport' || page === 'licence')
    ) {
      history.push(book.verification.selfie);
    } else if (responce.status === 200 && page === 'selfie') {
      yield put(authActions.authenticateAsync());
      history.push(book.verification.status);
    }
  } catch (error) {
    yield put(uiActions.emitError(error, 'uploadPhoto worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
