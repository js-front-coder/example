// Core
import React from 'react';
import cx from 'classnames';
import { Formik, Form, Field } from 'formik';
import logoSrc from 'theme/images/Logo/logo.svg';
import pictureSrc from 'theme/images/Login/pictureLogin.png';

import { sms } from 'bus/forms/shapes';
import styles from './SecondAuthentication.module.scss';

export const SecondAuthenticationView = ({ resend, handleResend }) => (
  <section className={styles.wrapperLogin}>
    <div className={styles.blockImage}>
      <div className={styles.wrapperImages}>
        <img className={styles.logo} src={logoSrc} alt="logo" />
      </div>
      <div className={styles.infoText}>
        Secure And Easy Way To Pay And Get Paid
      </div>
      <div className={styles.wrapperImages}>
        <img className={styles.picture} src={pictureSrc} alt="logo" />
      </div>
    </div>

    <div className={styles.blockForm}>
      <div className={styles.wrapperForm}>
        <Formik
          initialValues={sms.shape}
          render={props => {
            const { values } = props;

            const buttonResend = cx(styles.button, styles.buttonResend, {
              [styles.disable]: resend > 0
            });

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
          // onSubmit={submitSms}
        />
      </div>
    </div>
  </section>
);
