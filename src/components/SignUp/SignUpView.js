// Core
import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import { NavigationLogin } from "components/Common";
import { ValidatePoints } from "components/Common";

import { book } from "navigation/book";
import { signUp } from "bus/forms/shapes";

import logoSrc from "theme/images/Logo/logo.svg";
import pictureSrc from "theme/images/Login/pictureSignUp.png";

import styles from "./SignUp.module.scss";

export const SignUpView = ({ phone, submitSignUp, handlePhoneChange, errorMessage }) => (
  <section className={styles.wrapperSignup}>
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
          initialValues={signUp.shape}
          render={props => {
            const { isValid, touched, errors, values } = props;

            const styleEmail = cx(styles.input, styles.inputEmail, {
              [styles.invalidInput]: !isValid && touched.email && errors.email
            });

            const stylePassword = cx(styles.input, styles.inputPassword, {
              [styles.invalidInput]:
                !isValid && touched.password && errors.password
            });

            const styleRePassword = cx(styles.input, styles.inputPassword, {
              [styles.invalidInput]:
                !isValid && touched.rePassword && errors.rePassword
            });

            const typePersonal = cx(styles.typeButtons, styles.personal, {
              [styles.activeType]: props.values.type === "Personal"
            });

            const typeBusiness = cx(styles.typeButtons, styles.business, {
              [styles.activeType]: props.values.type === "Business"
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
                    <p className={styles.label}>E-mail</p>
                    <Field
                      value={values.email}
                      name="email"
                      type="email"
                      autoComplete="off"
                      className={styleEmail}
                      placeholder="Enter your e-mail"
                    />
                  </label>

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

                  <ValidatePoints password={values.password} />

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Re-enter password</p>
                    <Field
                      value={values.rePassword}
                      type="password"
                      name="rePassword"
                      autoComplete="off"
                      className={styleRePassword}
                      placeholder="Enter your password"
                    />
                  </label>

                  <div className={styles.wrapperButtons}>
                    <input
                      type="button"
                      value="Personal"
                      className={typePersonal}
                      onClick={() => props.setFieldValue("type", "Personal")}
                    />
                    <input
                      type="button"
                      value="Business"
                      className={typeBusiness}
                      onClick={() => props.setFieldValue("type", "Business")}
                    />
                  </div>

                  <p className={errorMessage ? `${styles.confirm} ${styles['confirm--error']} ` : styles.confirm}>
                    By clicking "Get Dimo" you confirm that you have read and
                    understood the{" "}
                    <a
                      href="https://dimo.org/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkConfirm}
                    >
                      Dimo Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://dimo.org/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkConfirm}
                    >
                      Terms and Conditions
                    </a>
                    , and agree to its terms.
                  </p>
                  {errorMessage && (
                    <p className={styles.error}>{errorMessage}</p>
                  )}
                  <button className={styles.button} type="submit">
                    Get Dimo
                  </button>
                </div>
              </Form>
            );
          }}
          validationSchema={signUp.schema}
          onSubmit={submitSignUp}
        />
      </div>
    </div>
  </section>
);
