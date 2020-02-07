import { takeLatest, takeEvery, all, call } from 'redux-saga/effects';

import { topupActions } from '../actions';

import { exchange, methods, payment, cash } from './workers';

export function* exchangeWorker() {
  yield takeLatest(topupActions.topupExchangeAsync, exchange);
}

export function* methodsWorker() {
  yield takeEvery(topupActions.topupMethodsAsync, methods);
}

export function* paymentWorker() {
  yield takeEvery(topupActions.topupPaymentAsync, payment);
}

export function* getMerchants() {
    yield takeEvery(topupActions.getMerchantsAsync, cash);
}

export function* watchTopUp() {
  yield all([call(exchangeWorker), call(methodsWorker), call(paymentWorker), call(getMerchants)]);
}
