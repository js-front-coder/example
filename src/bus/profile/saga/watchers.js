import { takeEvery, all, call } from 'redux-saga/effects';

import { profileActions } from '../actions';

import {
  uploadAvatar,
  updateProfile,
  verifyPhone,
  changeNumber,
  getBalances
} from './workers';
import {usersActions} from "../../users/actions";

export function* watchUploadAvatar() {
  yield takeEvery(profileActions.uploadAvatarAsync, uploadAvatar);
}

export function* watchUpdateProfile() {
  yield takeEvery(profileActions.updateProfileAsync, updateProfile);
}

export function* watchVerifyPhone() {
  yield takeEvery(profileActions.verifyPhoneAsync, verifyPhone);
}

export function* watchChangeNumber() {
  yield takeEvery(profileActions.changeNumberAsync, changeNumber);
}

export function* getBalancesWorker() {
  yield takeEvery(profileActions.getBalances, getBalances);
}

export function* profileDomain() {
  yield all([
    call(watchUploadAvatar),
    call(watchUpdateProfile),
    call(watchVerifyPhone),
    call(watchChangeNumber),
      call(getBalancesWorker)
  ]);
}
