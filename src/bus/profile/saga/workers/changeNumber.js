import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* changeNumber({ payload: code }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.profile.changeNumber, [code]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error('This number is registered');
      // throw new Error(message);
    }

    yield put(profileActions.fillNumber(data));
  } catch (error) {
    yield put(uiActions.emitError(error, 'changeNumber worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}