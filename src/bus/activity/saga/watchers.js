import { takeEvery, all, call } from 'redux-saga/effects';

import { activityActions } from '../actions';

import { fetchActivity } from './workers';

export function* fetchActivityWorker() {
  yield takeEvery(activityActions.fetchActivityAsync, fetchActivity);
}

export function* activityDomain() {
  yield all([call(fetchActivityWorker)]);
}
