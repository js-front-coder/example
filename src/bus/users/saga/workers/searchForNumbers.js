import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { usersActions } from 'bus/users/actions';

import { uiActions } from 'bus/ui/actions';

export function* searchForNumbers(value) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.users.searchForNumbers, [value]);
    const { data: numbers, message } = yield apply(responce, responce.json);
    if (responce.status !== 200) {
      throw new Error(message);
    }
    yield put(usersActions.fillNumberUsers(numbers));
  } catch (error) {
    yield put(uiActions.emitError(error, 'Users search worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
