import { takeLatest, takeEvery, all, call } from 'redux-saga/effects';

import { redeemActions } from '../actions';

import { exchange, methods, payment } from './workers';

export function* exchangeWorker() {
  yield takeLatest(redeemActions.redeemExchangeAsync, exchange);
}

export function* methodsWorker() {
  yield takeEvery(redeemActions.redeemMethodsAsync, methods);
}

export function* paymentWorker() {
  yield takeEvery(redeemActions.redeemPaymentAsync, payment);
}

export function* watchRedeem() {
  yield all([
    call(exchangeWorker),
    call(methodsWorker),
    call(paymentWorker),
  ]);
}
