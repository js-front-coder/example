import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { sendActions } from 'bus/send/actions';

export function* sendMoney({ payload: {dataSend, next} }) {

  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.send.checkWallet, [dataSend.to]);

    if (response.data === null) {
      yield put(uiActions.openModalWallet('Send'));
    } else {
      dataSend.to = response.data._id;

      yield put(uiActions.startFetching());

      const responce = yield apply(api, api.send.send, [dataSend]);
      const { data, message } = yield apply(responce, responce.json);

      if (responce.status === 400) {
        yield put(uiActions.openModalWallet('Send'));
      }

      if (responce.status !== 200 && responce.status !== 400) {
        throw new Error(message);
      }

      if (responce.status === 200) {
        yield put(sendActions.openSuccessModal());
          next(dataSend);
        yield put(sendActions.fillSend(data.balances.DIMO));
      }
    }


  } catch (error) {
    yield put(uiActions.emitError(error, 'sendMoney worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }


  // try {
  //   yield put(uiActions.startFetching());
  //
  //   const responce = yield apply(api, api.send.send, [dataSend]);
  //   const { data, message } = yield apply(responce, responce.json);
  //
  //   if (responce.status === 400) {
  //     yield put(uiActions.openModalWallet('Send'));
  //   }
  //
  //   if (responce.status !== 200 && responce.status !== 400) {
  //     throw new Error(message);
  //   }
  //
  //   if (responce.status === 200) {
  //     yield put(sendActions.openSuccessModal());
  //     yield put(sendActions.fillSend(data.balances.DIMO));
  //   }
  // } catch (error) {
  //   yield put(uiActions.emitError(error, 'sendMoney worker'));
  // } finally {
  //   yield put(uiActions.stopFetching());
  // }
}
