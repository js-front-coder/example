// Core
import React from 'react';
import { Portal, Button } from 'components/Common';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

import close from 'theme/images/Common/close.svg';
import styles from './ChangeNumber.module.scss';

export const ChangeNumberView = ({
  phone,
  submitNumber,
  closeModalNumber,
  handlePhoneChange
}) => (
  <Portal>
    <div className={styles.wrapperModal}>
      <img
        src={close}
        alt="close"
        onClick={closeModalNumber}
        className={styles.close}
      />
      <h1 className={styles.title}>Change phone number</h1>

      <div className={styles.wrapperNumber}>
        <PhoneInput
          value={phone}
          placeholder="+ (__) ___ - __ - __"
          country="TZ"
          error={
            phone.length > 0
              ? isValidPhoneNumber(phone)
                ? undefined
                : '2'
              : undefined
          }
          onChange={handlePhoneChange}
        />
      </div>
      <div className={styles.wrapperButton}>
        <Button blue value="Submit" handleAction={submitNumber} />
      </div>
    </div>
  </Portal>
);
