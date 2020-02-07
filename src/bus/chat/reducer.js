import {handleActions} from 'redux-actions';
import * as R from 'ramda';

import {chatActions} from './actions';

const roomInit = {
    members: [],
    msgList: [],
    newMsgList: [],
    newMsg: '',
    id: null,
    name: 'Test',
    status: 'offline'
};

const initialState = {
    rooms: [],
    server: false,
    connection: false,
    activeRoom: {},
    activeMessage: {},
    search: ''
};

export const chatReducer = handleActions(
    {
        [chatActions.serverOn]: (state) => {
            return {
                ...state,
                server: true
            };
        },
        [chatActions.serverOff]: (state) => {
            return {
                ...state,
                server: false
            };
        },
        [chatActions.chatServerConnectionOn]: (state) => {
            return {
                ...state,
                connection: true
            };
        },
        [chatActions.chatServerConnectionOff]: (state) => {
            return {
                ...state,
                connection: false
            };
        },
        [chatActions.fillChatData]: (state, {payload: {data, userId}}) => {
            return {
                ...state,
                rooms: data.map(r => {
                    const msgList =  r.readMessages.concat(r.unreadMessages.filter(m => m.owner === userId));
                    const newMsgList = r.unreadMessages.filter(m => m.owner !== userId);
                    return {
                        members: r.members,
                        msgList,
                        newMsgList,
                        id: r._id
                    }
                })
            };
        },
        [chatActions.fillChatDataRoom]: (state, {payload}) => {
            const rooms = state.rooms;
            return {
                ...state,
                rooms
            };
        },
        [chatActions.setActiveRoom]: (state, {payload}) => {
            return {
                ...state,
                activeRoom : {...roomInit, ...payload}
            };
        },
        [chatActions.setActiveMessage]: (state, {payload}) => {
            return {
                ...state,
                activeMessage : payload
            };
        },
        [chatActions.addNewMessage]: (state, {payload}) => {
            const rooms = R.clone(state.rooms);
            const roomIndex = state.rooms.findIndex(r => r.id === payload.conversation);
            const activeRoom = R.clone(state.activeRoom);
            activeRoom.newMsgList = activeRoom.newMsgList.concat([payload]);
            activeRoom.newMsg = '';
            rooms[roomIndex].newMsgList = rooms[roomIndex].newMsgList.concat([payload]);

            return {
                ...state,
                rooms,
                activeRoom
            };
        },
        [chatActions.addNewMessageToAll]: (state, {payload}) => {
            const rooms = R.clone(state.rooms);
            const roomIndex = state.rooms.findIndex(r => r.id === payload.conversation);
            const activeRoom = R.clone(state.activeRoom);
            activeRoom.msgList = activeRoom.msgList.concat([payload]);
            activeRoom.newMsg = '';
            rooms[roomIndex].msgList = rooms[roomIndex].msgList.concat([payload]);

            return {
                ...state,
                rooms,
                activeRoom
            };
        },
        [chatActions.changeCurrentRoomMessage]: (state, {payload: newMsg}) => {
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    newMsg
                }
            };
        },
        [chatActions.channelOff]: (state) => {
            return {
                ...state,
                connection: false,
                server: false,
                activeRoom: {}
            };
        },
        [chatActions.chatSearchChange]: (state, {payload: search}) => {
            return {
                ...state,
                search
            };
        },
        [chatActions.chatMsgsStatusRead]: (state, {payload: msgs}) => {
            const rooms = R.clone(state.rooms);
            const roomIndex = state.rooms.findIndex(r => r.id === msgs[0].conversation);

            const activeRoom = R.clone(state.activeRoom);
            activeRoom.newMsgList = [];
            activeRoom.msgList = activeRoom.msgList.concat(msgs);
            activeRoom.newMsg = '';
            rooms[roomIndex].newMsgList = [];
            rooms[roomIndex].msgList = rooms[roomIndex].msgList.concat(msgs);

            return {
                ...state,
                rooms,
                activeRoom
            };
        },
        [chatActions.chatReadAllNewMsgs]: (state) => {
            return {
                ...state
            }
        }
    },
    initialState
);

export const getChatMember = state => ({roomId, memberId}) => {
    const room = state.chat.rooms.find(r => r.id === roomId);
    return room.members.find(m => m._id === memberId);
};

export const getMessagesByText = state => text => {
    const rooms = state.chat.rooms;
    const searchText = text.toLowerCase();
    const msgs = [];
    rooms.map(r=>{
        r.msgList.map(msg => {
            if((msg.text).toLowerCase().indexOf(searchText) >= 0){
                msgs.push(msg);
            }
        });
    });
    return msgs;
};

/**
 * Написал новое сообщение.
 * Получение сообщения с бека и прокидка его в newMsgList
 * Если у нового сообщения комната совпадает с активной комнатой - изменение статуса сообщений
 * Получение с бека подтверждения
 *
 *
 * */