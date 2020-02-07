import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { activityActions } from 'bus/activity/actions';

export function* fetchActivity({ payload: { type } }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.activity.activity, [type]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    yield put(activityActions.fillActivity(data));
  } catch (error) {
    yield put(uiActions.emitError(error, 'fetchActivity worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
