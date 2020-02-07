import {takeEvery, all, call} from 'redux-saga/effects';

import {chatActions} from '../actions';

import {
    initServerListeningSaga,
    chatSelectMessageSaga
} from './workers';

function* initChatServer() {
    yield takeEvery(chatActions.chatServerPrepare, initServerListeningSaga)
}

function* chatSelectMessage() {
    yield takeEvery(chatActions.chatSelectMessage, chatSelectMessageSaga)
}

export function* watchChat() {
    yield all([
        call(initChatServer),
        call(chatSelectMessage),
    ]);
}
