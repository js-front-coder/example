import { put, apply, delay, select } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { redeemActions } from 'bus/redeem/actions';

export function* exchange({ payload: value }) {
  try {
    yield delay(300);
    const state = yield select();
    const from = state.redeem.getValue.currency;
    // const to = state.redeem.getValue.getCurrency;
    const to = state.profile.user.currency;
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.redeem.exchange, [value, from, to]);
    const { data: getValue, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    yield put(redeemActions.fillExchangeRedeem(getValue));
  } catch (error) {
    yield put(uiActions.emitError(error, 'exchange redeem worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
