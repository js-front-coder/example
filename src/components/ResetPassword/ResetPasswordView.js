// Core
import React from "react";
import { Formik, Form, Field } from "formik";
import cx from "classnames";

import { resetPassword } from "bus/forms/shapes";
import { ValidatePoints } from "components/Common";

import logoSrc from "theme/images/Logo/logo.svg";
import pictureSrc from "theme/images/Login/pictureLogin.png";

import styles from "./ResetPassword.module.scss";

export const ResetPasswordView = ({ mobile, submitReset }) => {
  const wrapperReset = cx(styles.wrapperReset, {
    [styles.adaptive]: mobile
  });

  const blockImage = cx(styles.blockImage, {
    [styles.adaptive]: mobile
  });

  const logo = cx(styles.logo, {
    [styles.adaptive]: mobile
  });

  const picture = cx(styles.picture, {
    [styles.adaptive]: mobile
  });

  const infoText = cx(styles.infoText, {
    [styles.adaptive]: mobile
  });

  const blockForm = cx(styles.blockForm, {
    [styles.adaptive]: mobile
  });

  const wrapperForm = cx(styles.wrapperForm, {
    [styles.adaptive]: mobile
  });

  const title = cx(styles.title, {
    [styles.adaptive]: mobile
  });

  const underTitle = cx(styles.underTitle, {
    [styles.adaptive]: mobile
  });

  const button = cx(styles.button, {
    [styles.adaptive]: mobile
  });

  const centeredWrapperStyle = cx(styles.centeredWrapperStyle, {
    [styles.adaptive]: mobile
  });
  return (
    <section className={wrapperReset}>
      <div className={blockImage}>
        <img className={styles.logo} src={logoSrc} alt="logo" />
        <div className={styles.inner}>
          <div className={infoText}>
            Secure And Easy Way To Pay And Get Paid
          </div>
          <div className={styles.wrapperImages}>
            <img className={picture} src={pictureSrc} alt="logo" />
          </div>
        </div>
      </div>

      <div className={blockForm}>
        <div className={wrapperForm}>
          <h1 className={title}>Reset your password</h1>
          <p className={underTitle}>Please set new password</p>
          <Formik
            initialValues={resetPassword.shape}
            render={props => {
              const { isValid, touched, errors, values } = props;

              const stylePassword = cx(styles.input, styles.inputPassword, {
                [styles.invalidInput]:
                  !isValid && touched.password && errors.password,
                [styles.adaptive]: mobile
              });

              const styleRePassword = cx(styles.input, styles.inputPassword, {
                [styles.invalidInput]:
                  !isValid && touched.rePassword && errors.rePassword,
                [styles.adaptive]: mobile
              });

              return (
                <Form className={styles.form}>
                  <div className={centeredWrapperStyle}>
                    <Field
                      value={values.password}
                      name="password"
                      type="password"
                      autoComplete="off"
                      className={stylePassword}
                      placeholder="New password"
                    />

                    <ValidatePoints password={values.password} />

                    <Field
                      value={values.rePassword}
                      type="password"
                      name="rePassword"
                      autoComplete="off"
                      className={styleRePassword}
                      placeholder="Retype new password"
                    />
                  </div>
                  <button className={button} type="submit">
                    Reset my Password
                  </button>
                </Form>
              );
            }}
            validationSchema={resetPassword.schema}
            onSubmit={submitReset}
          />
        </div>
      </div>
    </section>
  );
};
