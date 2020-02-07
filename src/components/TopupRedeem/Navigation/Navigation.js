// Core
import React from 'react';

import { NavLink } from 'react-router-dom';

import { book } from 'navigation/book';

import styles from './Navigation.module.scss';

export const Navigation = () => (
    <div className={ styles.wrapperNavigation }>
        <NavLink
            to={book.topupRedeem.topup}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
        >
            Topup
        </NavLink>

        <NavLink
            to={book.topupRedeem.redeem}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
        >
            Withdraw
        </NavLink>
        {/*<NavLink*/}
            {/*to={book.topupRedeem.mLocation}*/}
            {/*className={styles.itemLink}*/}
            {/*activeClassName={styles.activeLink}*/}
        {/*>*/}
            {/*Merchants Location*/}
        {/*</NavLink>*/}
    </div>
);
