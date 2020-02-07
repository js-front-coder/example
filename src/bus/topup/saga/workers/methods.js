import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { topupActions } from 'bus/topup/actions';

export function* methods() {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.topup.methods);
    const { data: dataMethods, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    yield put(topupActions.fillMethodsTopup(dataMethods));
  } catch (error) {
    yield put(uiActions.emitError(error, 'methods top up worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
