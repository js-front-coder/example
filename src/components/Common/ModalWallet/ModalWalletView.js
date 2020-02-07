// Core
import React from 'react';

import { Portal, Button } from 'components/Common';
import imgSrc from 'theme/images/Common/attention.svg';
import styles from './ModalWallet.module.scss';

export const ModalWalletView = ({ type, handleAction }) => (
  <Portal>
    <div className={styles.wrapperModal}>
      <h1 className={styles.title}>Attention</h1>

      <img className={styles.img} src={imgSrc} alt="attention" />

      <p className={styles.info}>You have increased your wallet limit</p>

      <Button value={`BACK TO ${type}`} red handleAction={handleAction} />
    </div>
  </Portal>
);
