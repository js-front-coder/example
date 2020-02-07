import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { history } from 'helper/history';
import { book } from 'navigation/book';
import { profileActions } from 'bus/profile/actions';

export function* payment({ payload }) {
  const {data, goto} = payload;
  console.log(payload);
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.topup.payment, [data]);

    if (response.status !== 200) {
      console.log(response);
      const { message } = yield apply(response, response.json);
      throw new Error(message);
    }

    history.push(goto ? goto : book.topupRedeem.topup);
  } catch (error) {
    yield put(uiActions.emitError(error, 'payment topup worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
