// Core
import React from 'react';
import cx from 'classnames';
import { Formik, Form, Field } from 'formik';
import { Portal } from 'components/Common';

import { sms } from 'bus/forms/shapes';

import close from 'theme/images/Common/close.svg';
import styles from './SmsCode.module.scss';

export const SmsCodeView = ({
  resend,
  submitSms,
  closeModalSms,
  handleResend
}) => {
  const buttonResend = cx(styles.button, styles.buttonResend, {
    [styles.disable]: resend > 0
  });

  return (
    <Portal>
      <div className={styles.wrapperModal}>
        <img
          src={close}
          alt="close"
          onClick={closeModalSms}
          className={styles.close}
        />
        <h1 className={styles.title}>Change phone number</h1>

        <div className={styles.wrapperNumber}>
          <Formik
            initialValues={sms.shape}
            render={props => {
              const { values } = props;

              return (
                <Form className={styles.form}>
                  <div className={styles.centeredWrapperStyle}>
                    <label className={styles.wrapperLable}>
                      <p className={styles.label}>Code from SMS</p>
                      <Field
                        value={values.sms}
                        name="sms"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter code"
                        className={styles.input}
                      />
                    </label>

                    <button
                      type="button"
                      disabled={resend > 0}
                      className={buttonResend}
                      onClick={handleResend}
                    >
                      Resend {resend > 0 ? resend : ''}
                    </button>
                  </div>
                  <div className={styles.wrapperButtons}>
                    <button className={styles.button} type="submit">
                      Verify
                    </button>
                  </div>
                </Form>
              );
            }}
            onSubmit={submitSms}
          />
        </div>
      </div>
    </Portal>
  );
};
