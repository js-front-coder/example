// Core
import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import { book } from 'navigation/book';

import styles from './NavigationLogin.module.scss';

export const NavigationLogin = () => {
  const loginLink = cx(styles.itemLink, styles.loginLink, {
    [styles.adaptive]: window.innerWidth <= 768
  });

  const signUpLink = cx(styles.itemLink, styles.signUpLink, {
    [styles.adaptive]: window.innerWidth <= 768
  });

  return (
    <div className={styles.navigation}>
      <NavLink
        to={book.login}
        className={loginLink}
        activeClassName={styles.activeLink}
      >
        Login
      </NavLink>

      <NavLink
        to={book.signup}
        className={signUpLink}
        activeClassName={styles.activeLink}
      >
        Create
      </NavLink>
    </div>
  );
};
