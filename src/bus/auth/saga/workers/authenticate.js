import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';
import { profileActions } from 'bus/profile/actions';
import { topupActions } from 'bus/topup/actions';
import { redeemActions } from 'bus/redeem/actions';

export function* authenticate({ payload: token }) {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.auth.authenticate, [token]);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    // console.log('data KYC', data.kyc.status);
    console.log('AUTH_DATA', data);

    // const topupCurrency = data.currency === 'TZS' ? 'dTZS' : 'dUGX';   //  * hiddenDimo *

    if (data.kyc.status === 'Empty') {
      history.push(book.verification.notification);
    } else if (data.kyc.status === 'Approved') {
      history.push(book.wallets.wallets);
    } else {
      history.push(book.verification.status);
      // history.push(book.verification.passport);
    }

    yield put(profileActions.fillProfile(data));
    // yield put(topupActions.setTopupCurrency(topupCurrency));   //  * hiddenDimo *
    // yield put(redeemActions.setRedeemCurrency(topupCurrency));   //  * hiddenDimo *
    yield put(profileActions.getBalances());
    yield put(authActions.authenticate());
  } catch (error) {
    yield put(uiActions.emitError(error, 'authenticate worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
