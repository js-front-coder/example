// Core
import React from 'react';
import { connect } from 'react-redux';

import { Portal, Button } from 'components/Common';
import { profileActions } from 'bus/profile/actions';

import close from 'theme/images/Common/close.svg';

import styles from './QrModal.module.scss';
import QRCode from "qrcode.react";

export default ({statusModalCode, qrValue, closeModal }) => {

  return (
    <>
      {statusModalCode ? (
        <Portal>
          <div className={styles.wrapperModal}>
            <img
                src={close}
                alt="close"
                onClick={closeModal}
                className={styles.close}
            />
            <div className={styles.modalText}>Your Address</div>
            <QRCode value={qrValue} size={256}/>
          </div>
        </Portal>
      ) : null}
    </>
  );
};
