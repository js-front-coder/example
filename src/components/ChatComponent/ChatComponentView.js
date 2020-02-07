// Core
import React from 'react';

import Contacts from './Contacts/Contacts';
import Room from './Room/Room';

import styles from './ChatComponent.module.scss';

export default () => (
    <div className={styles.chatComponent}>
        <Contacts className={styles.chatComponent__contacts}/>
        <Room className={styles.chatComponent__room}/>
    </div>
);