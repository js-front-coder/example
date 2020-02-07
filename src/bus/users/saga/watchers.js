import { takeEvery, all, call } from 'redux-saga/effects';

import { usersActions } from '../actions';

import { searchForNumbers} from './workers';

export function* searchForNumbersWorker() {
  yield takeEvery(usersActions.fillNumberUsersAsync, searchForNumbers);
}

export function* watchUsers() {
  yield all([call(searchForNumbersWorker)]);
}
