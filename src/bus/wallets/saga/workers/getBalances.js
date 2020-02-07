import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { walletsActions } from 'bus/wallets/actions';

import { uiActions } from 'bus/ui/actions';

export function* getBalances() {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.wallets.balance);
        const { data, message } = yield apply(response, response.json);
        if (response.status !== 200) {
            throw new Error(message);
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'Users balance worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
