import React from 'react';

import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

import styles from './Contacts.module.scss';

export default ({className = ''}) => (
    <div className={`${styles.contacts} ${className}`.trim()}>
        <Filter className={styles.contacts__filter}/>
        <ContactList className={styles.contacts__list}/>
    </div>
);