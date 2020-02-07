// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

import { book } from 'navigation/book';

import styles from './Navigations.module.scss';

export const Navigations = () => (
  <div className={styles.wrapperNavigation}>
    <NavLink
      to={book.verification.passport}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Passport
    </NavLink>

    <NavLink
      to={book.verification.certificate}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Certificate of birth
    </NavLink>

    <NavLink
      to={book.verification.licence}
      className={styles.itemLink}
      activeClassName={styles.activeLink}
    >
      Driver’s licence
    </NavLink>
  </div>
);
