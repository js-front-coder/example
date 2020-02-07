import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* uploadAvatar({ payload: avatar }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.profile.uploadAvatar, [
      { data: avatar }
    ]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error(message);
    }

    yield put(profileActions.fillAvatar(data));
  } catch (error) {
    yield put(uiActions.emitError(error, 'uploadAvatar worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
