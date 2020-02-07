import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { redeemActions } from 'bus/redeem/actions';

export function* methods() {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.redeem.methods);
    const { data: dataMethods, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    yield put(redeemActions.fillMethodsRedeem(dataMethods));
  } catch (error) {
    yield put(uiActions.emitError(error, 'methods redeem worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
