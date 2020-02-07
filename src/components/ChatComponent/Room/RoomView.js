import React from 'react';
import SVG from 'react-inlinesvg';
import * as R from 'ramda';

import styles from './Room.module.scss';
import MessageList from "../MesssageList/MessageList";
import NewMessage from "../NewMessage/NewMessage";
import svgSend from 'theme/images/Chat/24_arrow-back.svg';

export default ({className = '', room = {}, user = {}, onSendMoney}) => {

    const members = R.path(['members'], room);
    const roomName = user._id !== undefined && members !== undefined ?
        members.filter(m => m._id !== user._id).map(m=> m.phone).join(', ') : '';

    return (
        <div className={`${styles.room} ${className}`}>
            {
                room.id ? (
                    <React.Fragment>
                        <div className={styles.room__header}>
                            <h3 className={styles.room__roomName}>{roomName}</h3>
                            <button className={styles.sendMoney} onClick={onSendMoney}>
                                <SVG src={svgSend}/>
                                <div>Send Money</div>
                            </button>
                            <div className={styles.room__line}></div>
                        </div>
                        <MessageList className={styles.room__main} roomId={room.id}/>
                        <NewMessage className={styles.room__newMessage}/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className={styles.room__emptyContainer}>
                            Please select chat to
                            start messaging
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    );
}