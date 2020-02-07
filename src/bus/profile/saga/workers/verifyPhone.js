import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* verifyPhone({ payload: phone }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.profile.verifyPhone, [phone]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    console.log(data);
  } catch (error) {
    yield put(uiActions.emitError(error, 'verifyPhone worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
