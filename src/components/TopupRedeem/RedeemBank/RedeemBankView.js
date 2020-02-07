// Core
import React from 'react';
import cx from 'classnames';

import { Formik, Form, Field } from 'formik';
import { bankRedeem } from 'bus/forms/shapes';

import styles from './RedeemBank.module.scss';

export const RedeemBankView = ({
  cancelRedeemBank,
  submitRedeemBank,
  handleNumber,
  validateSwiftField
}) => (
  <div className={styles.wrapperRedeemBank}>
    <Formik
      initialValues={bankRedeem.shape}
      render={props => {
        const { isValid, touched, errors, values, setFieldValue } = props;

        const styleAccount = cx(styles.input, styles.inputAccount, {
          [styles.invalidInput]: !isValid && touched.account && errors.account
        });

        const styleBank = cx(styles.input, styles.inputBank, {
          [styles.invalidInput]: !isValid && touched.bank && errors.bank
        });

        const styleNumber = cx(styles.input, styles.inputNumber, {
          [styles.invalidInput]: !isValid && touched.number && errors.number
        });

        const styleSwift = cx(styles.input, styles.inputSwift, {
          [styles.invalidInput]: !isValid && touched.swift && errors.swift
        });

        return (
          <Form className={styles.form}>
            <div className={styles.centeredWrapperStyle}>
              <label className={styles.wrapperLable}>
                <p className={styles.label}>Bank account holder name</p>
                <Field
                  type="text"
                  name="account"
                  autoComplete="off"
                  value={values.account}
                  className={styleAccount}
                />
              </label>

              {!isValid && touched.account && errors.account && (
                <p className={styles.errorInfo}>
                  First and Last name used in government-issued ID, written in
                  English characters
                </p>
              )}

              <label className={styles.wrapperLable}>
                <p className={styles.label}>Bank</p>
                <Field
                  name="bank"
                  type="text"
                  autoComplete="off"
                  value={values.bank}
                  className={styleBank}
                />
              </label>

              {!isValid && touched.bank && errors.bank && (
                <p className={styles.errorInfo}>Invalid field Bank.</p>
              )}

              <label className={styles.wrapperLable}>
                <p className={styles.label}>SWIFT</p>
                <Field
                  name="swift"
                  //type="text"
                  autoComplete="off"
                  value={(values.swift)}
                  className={styleSwift}
                  onChange={e => {
                    setFieldValue('swift', validateSwiftField(e, values.swift));
                  }}
                />
              </label>

              {!isValid && touched.swift && errors.swift && (
                <p className={styles.errorInfo}>Invalid field SWIFT.</p>
              )}

              <label className={styles.wrapperLable}>
                <p className={styles.label}>Account Number</p>

                <Field
                  type="text"
                  name="number"
                  autoComplete="off"
                  value={values.number}
                  className={styleNumber}
                  onChange={e => handleNumber(e.target.value, setFieldValue)}
                />
              </label>

              {!isValid && touched.number && errors.number && (
                <p className={styles.errorInfo}>
                  Invalid card number. Please check your card and try again
                </p>
              )}

              <label className={styles.wrapperLable}>
                <p className={styles.label}>Comments (Optional)</p>

                <Field
                  name="comments"
                  component="textarea"
                  value={values.comments}
                  className={styles.textarea}
                />
              </label>

              <div className={styles.wrapperButtons}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.cansel}`}
                  onClick={cancelRedeemBank}
                >
                  Cancel
                </button>

                <button
                  className={`${styles.button} ${styles.сonfirm}`}
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Form>
        );
      }}
      validationSchema={bankRedeem.schema}
      onSubmit={submitRedeemBank}
    />
  </div>
);
