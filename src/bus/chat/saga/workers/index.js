import {
    take,
    call,
    put,
    select,
    fork,
    race,
    cancelled,
    delay,
    cancel
} from 'redux-saga/effects';
import * as R from "ramda";
import {chatActions} from "../../actions";

import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';

// wrapping functions for socket events (connect, disconnect, reconnect)
const socketObject = () => {
    let socket = io('https://dimo.cash');

    return {
        connect: () => {
            // socket = io(SERVER);
            return new Promise((resolve) => {
                socket.on('connect', () => {
                   // console.log('connect', socket);
                    resolve(socket);
                });
            });
        },
        disconnect: () => {
            //  socket = io(SERVER);
            return new Promise((resolve) => {
                socket.on('disconnect', () => {
                  //  console.log('disconnect', socket);
                    resolve(socket);
                });
            });
        },
        reconnect: () => {
            // socket = io(SERVER);
            return new Promise((resolve) => {
                socket.on('reconnect', () => {
                  //  console.log('reconnect', socket);
                    resolve(socket);
                });
            });
        }
    }
};
// This is how channel is created
const createSocketChannel = (socket) => eventChannel((emit) => {
    console.log('CREATE SOCKET');

    function chatConnectionHandlerSuccess(data) {
        emit({req: 'chatData', data});
    }

    function chatCreationRoomSuccess(data) {
        emit({req: 'initConversation ', data});
    }

    function chatCreationErrorMessage(data) {
       // console.log(data);
    }

    function chatOnNewMessage(data) {
        emit({req: 'newMessage', data});
    }

    function chatOnMessageUpdated(data) {
        emit({req: 'messagesUpdated', data});
    }

    socket.on('chatData', chatConnectionHandlerSuccess);
    socket.on('initConversation', chatCreationRoomSuccess);
    socket.on('errorMessage', chatCreationErrorMessage);
    socket.on('newMessage', chatOnNewMessage);
    socket.on('messagesUpdated', chatOnMessageUpdated);

    return () => {
        console.log('DELETE SOCKET');
    };
});

// connection monitoring sagas
const listenDisconnectSaga = function* (disconnect) {
    while (true) {
        yield call(disconnect);
        yield put(chatActions.chatServerConnectionOff());
    }
};
const listenConnectSaga = function* (reconnect) {
    while (true) {
        yield call(reconnect);
        yield put(chatActions.chatServerConnectionOn());
    }
};
const tryConnectSaga = function* (socket, token) {
    while (true) {
        yield take(chatActions.chatServerConnectionTry);
        socket.emit('subscribeChat', {token});
    }
};
const tryDisconnectSaga = function* (socket, token) {
    while (true) {
        yield take(chatActions.chatServerDisconnectionTry);
        socket.emit(`unsubscribeChat`, {token});
    }
};

const createNewRoom = function* (socket, token) {
    while (true) {
        const {payload} = yield take(chatActions.chatCreateNewRoom);
        const {phone} = payload;
        const data = {phone};

        //console.log(data);

        socket.emit(
            `createConversation`,
            {
                token,
                data
            }
        );
    }
};

const sendNewMessage = function* (socket, token) {
    while (true) {
        const {payload} = yield take(chatActions.chatSendNewMessage);
        const {text, conversationId} = payload;
        const data = {text, conversationId};

        socket.emit(
            `sendMessage`,
            {
                token,
                data
            }
        );
    }
};

const msgListRead = function* (socket, token) {
    while (true) {
        const {payload} = yield take(chatActions.chatSendMessagesRead);
        const data = {messagesId: payload.map(m=>m._id), conversationId: payload[0].conversation};
       // console.log(data);

        socket.emit(
            `messagesRead`,
            {
                token,
                data
            }
        );
    }
};

const readAllMsgsInActiveRoom = function* (socket, token) {
    while (true) {
        yield take(chatActions.chatReadAllNewMsgs);
        const state = yield select();
        const activeRoom = state.chat.activeRoom;
        const data = {messagesId: activeRoom.newMsgList.map(m=>m._id), conversationId: activeRoom.id};

       // console.log('messagesRead', data);

        if(data.messagesId.length) {
            socket.emit(
                `messagesRead`,
                {
                    token,
                    data
                }
            );
        }
    }
};

const listenServerSaga = function* () {
    const token = localStorage.getItem('token');
    const _socketObject = socketObject();
    const {connect, disconnect, reconnect} = _socketObject;
    const state = yield select();
    const userId = state.profile.user._id;


    const {socket, timeout} = yield race({
        socket: call(connect),
        timeout: delay(2000),
    });

    if (timeout) {
        yield put(chatActions.serverOff());
    } else {
        yield put(chatActions.serverOn());
    }
    const socketChannel = yield call(createSocketChannel, socket);

    try {
        yield fork(listenDisconnectSaga, disconnect);
        yield fork(listenConnectSaga, reconnect);
        yield fork(tryConnectSaga, socket, token);
        yield fork(tryDisconnectSaga, socket, token);
        yield fork(createNewRoom, socket, token);
        yield fork(sendNewMessage, socket, token);
        yield fork(msgListRead, socket, token);
        yield fork(readAllMsgsInActiveRoom, socket, token);

        while (true) {
            const payload = yield take(socketChannel);

            if (payload.req === 'chatData') {
                yield put(chatActions.chatServerConnectionOn());
                yield put(chatActions.fillChatData({data: payload.data, userId}));
            }
            else if(payload.req === 'initConversation') {
                yield put(chatActions.fillChatDataRoom(payload.data));
            }
            else if(payload.req === 'newMessage') {
                const state = yield select();
                const msg = payload.data;
                const chat = state.chat;
                const userId = state.profile.user._id;
                const activeRoomId = chat.activeRoom.id;

                //console.log(chat.activeRoom.id, msg.owner,  userId);
                if(msg.owner !== userId && msg.conversation === activeRoomId){
                    //console.log('chatSendMessagesRead');
                    yield put(chatActions.chatSendMessagesRead([msg]))
                }else if(msg.owner !== userId){
                    yield put(chatActions.addNewMessage(msg));
                } else {
                    yield put(chatActions.addNewMessageToAll(msg));
                }

            }
            else if(payload.req === 'messagesUpdated'){
                const state = yield select();
                const msgs = payload.data;
                const userId = state.profile.user._id;

                for(const msg of msgs){
                    if(msg.owner !== userId){
                        yield put(chatActions.chatMsgsStatusRead([msg]));
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        if (yield cancelled()) {
            console.log('END');
            disconnect(true);
            socketChannel.close();
            yield put(chatActions.channelOff());
        }
    }
};

export const initServerListeningSaga = function* () {
    const task = yield fork(listenServerSaga);
    yield take(chatActions.chatServerDestroy);
    yield cancel(task);
};

export const chatSelectMessageSaga = function* (action) {
    const {payload} = action;
    const state = yield select();

    const room = R.clone(state.chat.rooms.find(r => r.id === payload.conversation));

    if(room){
        yield put(chatActions.setActiveRoom(room));
        yield put(chatActions.setActiveMessage(R.clone(payload)))
    }
};