import { all, call } from 'redux-saga/effects';

import { watchAuth } from 'bus/auth/saga/watchers';
import { watchVerification } from 'bus/verification/saga/watchers';
import { watchTopUp } from 'bus/topup/saga/watchers';
import { watchRedeem } from 'bus/redeem/saga/watchers';
import { watchUsers } from 'bus/users/saga/watchers';
import { sendDomain } from 'bus/send/saga/watchers';
import { profileDomain } from 'bus/profile/saga/watchers';
import { activityDomain } from 'bus/activity/saga/watchers';
import { watchWallets } from 'bus/wallets/saga/watchers';
import { watchChat } from 'bus/chat/saga/watchers';
import { watchCurrency } from 'bus/currency/saga/watchers'

export function* rootSaga() {
  yield all([
    call(watchAuth),
    call(watchVerification),
    call(watchTopUp),
    call(watchRedeem),
    call(sendDomain),
    call(watchUsers),
    call(profileDomain),
    call(activityDomain),
    call(watchWallets),
    call(watchChat),
    call(watchCurrency),
  ]);
}
