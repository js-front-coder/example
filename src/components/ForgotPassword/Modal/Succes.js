// Core
import React from 'react';

import { Portal } from 'components/Common';
import close from 'theme/images/Common/close.svg';
import sendMoney from 'theme/images/ForgotPassword/mail.svg';
import styles from './Succes.module.scss';

export const SuccesModal = ({ email, status, handleCloseModal }) => {
  return (
    <>
      {status && (
        <Portal>
          <div className={styles.wrapperModal}>
            <img
              src={close}
              alt="close"
              className={styles.close}
              onClick={handleCloseModal}
            />
            <h1 className={styles.title}>Сheck your inbox</h1>
            <img src={sendMoney} alt="money" className={styles.money} />
            <p className={styles.info}>
              We’ve sent you a reset password link to {email}
            </p>
          </div>
        </Portal>
      )}
    </>
  );
};
