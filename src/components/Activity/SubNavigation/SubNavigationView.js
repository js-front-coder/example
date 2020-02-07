// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

import { book } from 'navigation/book';

import styles from './SubNavigation.module.scss';

export const SubNavigationView = () => (
  <div className={styles.wrapperNavigation}>
    <NavLink
      to={book.activity.all}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      All
    </NavLink>

    <NavLink
      to={book.activity.send}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Send
    </NavLink>

    <NavLink
      to={book.activity.topup}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Topup
    </NavLink>

    <NavLink
      to={book.activity.redeem}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Withdraw
    </NavLink>
  </div>
);
