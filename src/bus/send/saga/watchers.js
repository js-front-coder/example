import { takeEvery, all, call } from 'redux-saga/effects';

import { sendActions } from '../actions';

import { sendMoney, history } from './workers';

export function* sendMoneyWorker() {
  yield takeEvery(sendActions.sendAsync, sendMoney);
}

export function* getHistoryWorker() {
    yield takeEvery(sendActions.getHistoryAsync, history);
}


export function* sendDomain() {
  yield all([call(sendMoneyWorker), call(getHistoryWorker)]);
}
