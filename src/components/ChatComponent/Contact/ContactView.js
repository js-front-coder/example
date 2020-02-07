// Core
import React from 'react';
import * as R from 'ramda';
import moment from 'moment';

import styles from './Contact.module.scss';

//todo: transfer this code to the main component
export default ({
                    className = '',
                    room = {},
                    lastMsg,
                    roomIsActive = false,
                    setActiveRoom = () => {},
                    user
}) => {
    const setActiveRoomHandler = (event) => {
        event.stopPropagation();
        if(room.hasOwnProperty('id')){
            setActiveRoom(room);
        }
    };

    const {members, newMsgList} = room;
    const otherMembers = user._id !== undefined && members !== undefined ?
        members.filter(m => m._id !== user._id): [];

    const roomName = otherMembers.map(m=> m.phone).join(', ');

    return (
        <div
            className={`${className} ${styles.contact} ${roomIsActive ? styles['contact--active']: ''}`}
            onClick={setActiveRoomHandler}
        >
            <div className={styles.contact__avatar}>
                {otherMembers.map((m, index) => {
                    return m.avatar ? <img className={m.type === 'Business' ? styles.contact__businessAvatar : styles.contact__personalAvatar} key={index} src={m.avatar} alt="m.avatar"/> : null
                })}
            </div>
            <div className={styles.contact__main}>
                <div className={styles.contact__name}>
                    {roomName}
                </div>
                <div className={styles.contact__lastMsg}>
                    {lastMsg.text}
                </div>
                <div className={styles.contact__lastMsgDate}>
                    {moment(lastMsg.timestamp).format('HH:mm:ss')}
                </div>
                {newMsgList.length ? <div className={styles.contact__newMessages}>
                        {newMsgList.length}
                </div>: null}
            </div>
        </div>
    );
}