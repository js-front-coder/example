import { put, apply } from 'redux-saga/effects';

import { authActions } from 'bus/auth/actions';
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';
import { redeemActions } from "../../../redeem/actions";
import { topupActions } from "../../../topup/actions";

export function* logout() {
  try {
    yield put(uiActions.startFetching());

    // const responce = yield apply(api, api.auth.logout);

    // if (responce.status !== 204) {
    //     const { message } = yield apply(responce, responce.json);

    //     throw new Error(message);
    // }

  } catch (error) {
    yield put(uiActions.emitError(error, 'logout worker'));
  } finally {
    yield apply(localStorage, localStorage.removeItem, ['token']);
    yield put(uiActions.stopFetching());
    yield put(profileActions.clearProfile());
    yield put(redeemActions.resetStore());
    yield put(topupActions.resetStore());
    yield put(authActions.logout());
  }
}
