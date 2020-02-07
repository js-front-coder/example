// Core
import React from "react";
import { Formik, Form, Field } from "formik";
import cx from "classnames";

import { NavigationLogin } from "components/Common";

import { forgotPassword } from "bus/forms/shapes";

import logoSrc from "theme/images/Logo/logo.svg";
import pictureSrc from "theme/images/Login/pictureLogin.png";

import styles from "./ForgotPassword.module.scss";

export const ForgotPasswordView = ({ mobile, submitForgot, errorMessage }) => {
  const wrapperForgot = cx(styles.wrapperForgot, {
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

  return (
    <section className={wrapperForgot}>
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
          <NavigationLogin />

          <Formik
            initialValues={forgotPassword.shape}
            render={props => {
              const { isValid, touched, errors, values } = props;

              const styleEmail = cx(styles.input, styles.inputEmail, {
                [styles.invalidInput]:
                  !isValid && touched.email && errors.email,
                [styles.adaptive]: mobile
              });

              return (
                <Form className={styles.form}>
                  <div className={styles.centeredWrapperStyle}>
                    <h1 className={title}>Forgot your password?</h1>
                    <p className={underTitle}>
                      Enter your username and we’ll help you reset your password.
                    </p>
                    <Field
                      value={values.email}
                      name="email"
                      type="email"
                      autoComplete="off"
                      className={styleEmail}
                      placeholder="Enter your e-mail"
                    />
                  </div>
                  {errorMessage && (
                    <p className={styles.error}>{errorMessage}</p>
                  )}
                  <button className={button} type="submit">
                    Reset Password
                  </button>
                </Form>
              );
            }}
            validationSchema={forgotPassword.schema}
            onSubmit={submitForgot}
          />
        </div>
      </div>
    </section>
  );
};
