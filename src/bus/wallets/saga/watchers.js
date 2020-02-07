import { takeEvery, all, call } from 'redux-saga/effects';

import { walletsActions } from '../actions';

import {exchangeTransfer, asyncExchange, getBalances, getCharts} from './workers';

export function* exchangeTransferWorker() {
  yield takeEvery(walletsActions.setTransfer, exchangeTransfer);
}

export function* asyncExchangeWorker() {
  yield takeEvery(walletsActions.asyncExchange, asyncExchange);
}

export function* asyncChartsWorker() {
  yield takeEvery(walletsActions.getCharts, getCharts);
}

export function* watchWallets() {
  yield all(
    [
      call(exchangeTransferWorker),
      call(asyncExchangeWorker),
      call(asyncChartsWorker)
    ]
  );
}
