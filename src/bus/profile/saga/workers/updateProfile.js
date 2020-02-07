import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* updateProfile({ payload: credentials }) {
  try {
    yield put(uiActions.startFetching());

    const responce = yield apply(api, api.profile.updateProfile, [credentials]);
    const { data, message } = yield apply(responce, responce.json);

    if (responce.status !== 200) {
      throw new Error('This username is taken, please try a new one');
    }
    yield put(profileActions.fillProfile(data));

    const balances = yield apply(api, api.profile.getBalances);
    const balancesResponse = yield apply(balances, balances.json);

    if (balances.status !== 200) {
      throw new Error('balance error');
    }
    yield put(profileActions.setBalances(balancesResponse.data));

    yield put(profileActions.updateProfileSuccess());

  } catch (error) {
    yield put(uiActions.emitError(error, 'updateProfile worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
