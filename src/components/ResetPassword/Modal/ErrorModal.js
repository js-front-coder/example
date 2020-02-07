// Core
import React from 'react';
import { Portal, Button } from 'components/Common';
import imgSrc from 'theme/images/Common/attention.svg';
import close from 'theme/images/Common/close.svg';

import styles from './ErrorModal.module.scss';

export const ErrorModal = ({
  statusModal,
  closeModal,
  backToForgot,
  statusResponse
}) => (
  <>
    {statusModal && (
      <Portal>
        <div className={styles.wrapperModal}>
          <h1 className={styles.title}>Attention</h1>
          <img className={styles.img} src={imgSrc} alt="attention" />
          {statusResponse === 401 ? (
            <>
              <p className={styles.infoLink}>
                Link is not valid. Please send password change request again
              </p>
              <Button value="Back" red handleAction={backToForgot} />
            </>
          ) : (
            <>
              <img
                src={close}
                alt="close"
                onClick={closeModal}
                className={styles.close}
              />

              <p className={styles.infoPassword}>
                New password must be different from the old one
              </p>
            </>
          )}
        </div>
      </Portal>
    )}
  </>
);
