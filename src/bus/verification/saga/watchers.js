import { takeEvery, all, call } from 'redux-saga/effects';

import { verificationActions } from '../actions';

import { uploadPhoto } from './workers';

export function* watchUploadPhoto() {
  yield takeEvery(verificationActions.uploadPhotoAsync, uploadPhoto);
}

export function* watchVerification() {
  yield all([call(watchUploadPhoto)]);
}
