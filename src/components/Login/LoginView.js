// Core
import React from "react";
import { Formik, Form, Field } from "formik";
import SVG from "react-inlinesvg";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import { Link } from "react-router-dom";
import cx from "classnames";

import { NavigationLogin } from "components/Common";

import { login } from "bus/forms/shapes";
import { book } from "navigation/book";

import loginImg from "theme/images/Login/Login.svg";
import logoSrc from "theme/images/Logo/logo.svg";
import pictureSrc from "theme/images/Login/pictureLogin.png";

import styles from "./Login.module.scss";

export const LoginView = ({
  phone,
  submitLogin,
  handlePhoneChange,
  errorMessage
}) => (
  <section className={styles.wrapperLogin}>
    <div className={styles.blockImage}>
      <img className={styles.logo} src={logoSrc} alt="logo" />
      <div className={styles.inner}>
        <div className={styles.infoText}>
          Secure And Easy Way To Pay And Get Paid
        </div>
        <div className={styles.wrapperImages}>
          <img className={styles.picture} src={pictureSrc} alt="logo" />
        </div>
      </div>
    </div>

    <div className={styles.blockForm}>
      <div className={styles.wrapperForm}>
        <NavigationLogin />

        <Formik
          initialValues={login.shape}
          render={props => {
            const { isValid, touched, errors, values } = props;

            const stylePassword = cx(styles.input, styles.inputPassword, {
              [styles.invalidInput]:
                !isValid && touched.password && errors.password
            });

            return (
              <Form className={styles.form}>
                <div className={styles.centeredWrapperStyle}>
                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Mobile</p>
                  </label>

                  <PhoneInput
                    value={phone}
                    placeholder="+ (__) ___ - __ - __"
                    country="TZ"
                    countries={["TZ", "UG"]}
                    error={
                      phone.length > 0
                        ? isValidPhoneNumber(phone)
                          ? undefined
                          : "2"
                        : undefined
                    }
                    onChange={handlePhoneChange}
                  />

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Password</p>
                    <Field
                      value={values.password}
                      name="password"
                      type="password"
                      autoComplete="off"
                      className={stylePassword}
                      placeholder="Enter your password"
                    />
                  </label>
                  {errorMessage && (
                    <p className={styles.error}>{errorMessage}</p>
                  )}
                  <button className={styles.button} type="submit">
                    Login
                    <SVG src={loginImg} />
                  </button>
                </div>
              </Form>
            );
          }}
          validationSchema={login.schema}
          onSubmit={submitLogin}
        />
        <Link to={book.forgotPassword} className={styles.forgotLink}>
          I’ve forgotten my password
        </Link>
      </div>
    </div>
  </section>
);
