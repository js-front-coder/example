// Core
import React from 'react';

import { Portal, Button } from 'components/Common';
import close from 'theme/images/Common/close.svg';
import sendMoney from 'theme/images/Send/icn_money_send.svg';
import styles from './Succes.module.scss';

export const SuccesModal = ({ amount, status, handleCloseModal, currency, phone }) => {
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
            <h1 className={styles.title}>Send Success</h1>
            <img src={sendMoney} alt="money" className={styles.money} />
            <p className={styles.info}>
              You sent <span className={styles.bold}>{amount} {currency.value}</span> to <span className={styles.bold}>{phone}</span>
            </p>
            <Button
              blue
              value="Send more money"
              handleAction={handleCloseModal}
            />
          </div>
        </Portal>
      )}
    </>
  );
};
