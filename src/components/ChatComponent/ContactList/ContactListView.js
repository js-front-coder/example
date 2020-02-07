import React from 'react';
import SVG from "react-inlinesvg";

import Contact from '../Contact/Contact';
import Message from '../Message/Message';

import styles from './ContactList.module.scss';
import inviteSvg from 'theme/images/Chat/invite.svg';

//todo: transfer view to main component
export default ({className = '', contacts, messages, selectMessage}) => (
    <div className={`${styles.contactList} ${className}`.trim()}>
        <div className={styles.contacts}>
            {messages.length ? <h3 className={styles.contactList__title}>Contacts</h3> : null}
            {
                contacts.map((item, key) => (
                    <Contact
                        key={key}
                        className={`${styles.contactList__item} ${item.active ? styles['contact--active'] : ''}`}
                        roomId={item.id}
                    />
                ))
            }
        </div>
        {messages.length ? <div className={styles.messages}>
            <h3 className={styles.contactList__title}>Messages</h3>
            {
                messages.map(msg => (
                    <div className={styles.contactList__item} onClick={()=>selectMessage(msg)}>
                        <Message key={msg._id} message={msg}/>
                    </div>
                ))
            }
        </div> : null}
        {/*{contacts.length === 0 ? (*/}
        {/*<div className={styles.emptyContainer}>*/}
        {/*/!*<SVG className={styles.emptyContainer__img} src={inviteSvg}/>*!/*/}
        {/*<h3 className={styles.emptyContainer__title}>Empty contacts list</h3>*/}
        {/*/!*<div className={styles.emptyContainer__text}>Tell your friends about</div>*!/*/}
        {/*/!*<div className={styles.emptyContainer__text}>DIMO</div>*!/*/}
        {/*/!*<button className={styles.emptyContainer__button}>Invite Friends</button>*!/*/}
        {/*</div>*/}
        {/*) : null}*/}
    </div>
);