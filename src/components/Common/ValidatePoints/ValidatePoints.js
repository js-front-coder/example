// Core
import React from 'react';

import cx from 'classnames';

import styles from './ValidatePoints.module.scss';

export const ValidatePoints = ({ password }) => {
  const wrapperPoints = cx(styles.wrapperPoints, {
    [styles.adaptive]: window.innerWidth <= 768
  });

  const minCharacters = cx(styles.wrapperPoint, {
    [styles.active]: password.length > 7
  });

  const maxCharacters = cx(styles.wrapperPoint, {
    [styles.active]: password.length > 7 && password.length < 32
  });

  const uppercaseCharacters = cx(styles.wrapperPoint, {
    [styles.active]: /[A-Z]/.test(password)
  });

  const lowercaseCharacters = cx(styles.wrapperPoint, {
    [styles.active]: /[a-z]/.test(password)
  });

  const numberCharacters = cx(styles.wrapperPoint, {
    [styles.active]: /[0-9]/.test(password)
  });

  return (
    <div className={wrapperPoints}>
      <div className={styles.leftBlock}>
        <div className={minCharacters}>
          <div className={styles.circle} />
          <p className={styles.text}>At least 8 characters</p>
        </div>
        <div className={maxCharacters}>
          <div className={styles.circle} />
          <p className={styles.text}>No more than 32 characters</p>
        </div>
        <div className={uppercaseCharacters}>
          <div className={styles.circle} />
          <p className={styles.text}>One uppercase character</p>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <div className={lowercaseCharacters}>
          <div className={styles.circle} />
          <p className={styles.text}>One lowercase character</p>
        </div>
        <div className={numberCharacters}>
          <div className={styles.circle} />
          <p className={styles.text}>One number</p>
        </div>
      </div>
    </div>
  );
};
