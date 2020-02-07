import { put, apply, delay } from 'redux-saga/effects';

import { api } from 'REST';

import { uiActions } from 'bus/ui/actions';
import { sendActions } from 'bus/send/actions';

export function* history() {
    try {
        yield delay(300);
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.send.history);
        const { data, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(sendActions.fillHistory(data.data));
    } catch (error) {
        yield put(uiActions.emitError(error, 'history send worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}