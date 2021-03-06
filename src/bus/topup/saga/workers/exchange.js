import { put, apply, delay, select } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { topupActions } from 'bus/topup/actions';

export function* exchange({ payload: spend, currencyFrom, currencyTo }) {
  try {
    // yield delay(300);
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.topup.exchange, [spend, currencyFrom, currencyTo]);
    const { data: getValue, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    yield put(topupActions.fillExchangeTopup(getValue));
  } catch (error) {
    yield put(uiActions.emitError(error, 'exchange topup worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}