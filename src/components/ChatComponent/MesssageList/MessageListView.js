import React from 'react';
import Message from '../Message/Message';

import styles from './MessageList.module.scss';

export default ({className = '', list = [], listRef, isNew, goToActive, activeMsg, scrollToBottom}) => (
    <div className={`${className} ${isNew ? 'messageList--new' : ''}`.trim()}>
        <div className={styles.messageList} >
            {
                list.map(m => (
                    <Message key={m._id} message={m} goToActive={goToActive} scrollToBottom={scrollToBottom} isActive={activeMsg._id===m._id}/>
                ))
            }
        </div>
        <div ref={listRef} />
    </div>
);