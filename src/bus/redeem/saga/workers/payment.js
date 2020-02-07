import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { redeemActions } from 'bus/redeem/actions';
import { history } from 'helper/history';
import { book } from 'navigation/book';

export function* payment({ payload: dataRedeem }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.redeem.payment, [dataRedeem]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status === 400) {
      yield put(uiActions.openModalWallet('Redeem'));
    }

    if (responce.status !== 200 && responce.status !== 400) {
      throw new Error(message);
    }

    history.push(book.topupRedeem.redeem);
    yield put(redeemActions.fillPayment(data.balances.DIMO));
  } catch (error) {
    yield put(uiActions.emitError(error, 'payment redeem worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
