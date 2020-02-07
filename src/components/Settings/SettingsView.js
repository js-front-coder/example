// Core
import React from "react";
import cx from "classnames";
import { Formik, Form, Field } from "formik";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import TwitterLogin from "react-twitter-auth";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';

import { settings } from "bus/forms/shapes";

import styles from "./Settings.module.scss";

export const SettingsView = (
  {
    error,
    profile,
    userForm,
    openModalAvatar,
    openModalNumber,
    submitSettings,
    handleVerification,
    userGoogleInfo,
    userFacebookInfo,
    userTwitterInfo,
    userNameChange,
    profileAvatar,
    clearSuccessFlag,
    updateSuccess,
    handleName,
    handleEmail,
    handleAddress
  }) => {
  let fbContent = (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields="name, email, picture"
      callback={userFacebookInfo}
      cssClass={`${styles.buttonNetwork} ${styles.facebook}`}
      textButton=""
    />
  );

  let glContent = (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={userGoogleInfo}
      buttonText={""}
      onFailure={() => {
      }}
      cookiePolicy={"single_host_origin"}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={`${styles.buttonNetwork} ${styles.google}`} />
      )}
    />
  );

  // let twLogin = (
  //     <TwitterLogin
  //         loginUrl="http://localhost:4000/api/v1/auth/twitter"
  //         onFailure={this.onFailed}
  //         onSuccess={this.onSuccess}
  //         requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
  //     />
  // );

  const customHeader = {};
  customHeader["Access-Control-Allow-Origin"] = "*";

  const profileType = profile.type === 'Business';

  return (
    <div className={styles.wrapperSettings}>
      <div className={styles.leftSettings}>
        <div className={`${styles.wrapperPhoto} ${profileType && styles.businessBorder}`}>
          {profileAvatar && (
            <img
              alt="img"
              src={profileAvatar}
              onClick={openModalAvatar}
              className={styles.avatar}
            />
          )}
          {profile.isVerified && <div className={styles.verified}/>}
        </div>
        <div className={styles.wrapperInfo}>
          <div className={styles.wrapperTypeAccount}>
            {profile.type} Account
          </div>
          <div className={styles.titleInfo}>Limits</div>
          <div className={styles.underLine}/>
          <div className={styles.limits}>
            <div className={styles.limitsPoint}>
              <p className={styles.info}>Daily Limits:</p>
              <p className={styles.value}>
                {profile.limits.maxDailyWithdrawLimit}
              </p>
            </div>
            <div className={styles.limitsPoint}>
              <p className={styles.info}>Withdraw Limit:</p>
              <p className={styles.value}>
                {profile.limits.maxDailyWithdrawLimit}
              </p>
            </div>
          </div>
          <div className={styles.wrapperSocialNetworks}>
            <span className={styles.socialHeader}>
              Import data from social profile
            </span>
            <div className={styles.wrapperButtons}>
              <div>{glContent}</div>
              <div>{fbContent}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapperForm}>
        <Formik
          initialValues={userForm}
          enableReinitialize={true}
          render={props => {
            const { isValid, values, setFieldValue, touched, errors, dirty } = props;

            if (dirty && updateSuccess) {
              clearSuccessFlag();
            }

            const styleUsername = cx(styles.input, {
              [styles.invalidInput]: !isValid && touched.username && errors.username
            });

            return (
              <Form className={styles.form}>
                <div className={styles.centeredWrapperStyle}>
                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>First Name</p>
                    <Field
                      value={values.firstName}
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your first name"
                      className={styles.input}
                      onChange={e => handleName(e, setFieldValue)}
                    />
                  </label>

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Last Name</p>
                    <Field
                      value={values.lastName}
                      name="lastName"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your second name"
                      className={styles.input}
                      onChange={e => handleName(e, setFieldValue)}
                    />
                  </label>

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>E-mail</p>
                    <Field
                      value={values.email}
                      name="email"
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your e-mail"
                      className={styles.input}
                      onChange={e => {
                        handleEmail(e, setFieldValue)
                      }
                      }
                    />
                  </label>
                  <div className={styles.boxLabel}>
                    <label className={styles.wrapperLable}>
                      <p className={styles.label}>Mobile number</p>
                      <div className={styles.inputGroup}>
                        <Field
                          type="text"
                          name="phone"
                          disabled
                          autoComplete="off"
                          value={values.phone}
                          className={cx(styles.input, styles.inputBtn)}
                        />
                        <button
                          type="button"
                          onClick={openModalNumber}
                          className={styles.changeButton}
                        >
                          Change
                        </button>
                      </div>
                    </label>
                  </div>
                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Country</p>
                    <div
                      className={`${styles.input}`}>
                      <ReactFlagsSelect
                        className={styles.country}
                        defaultCountry={profile.country}
                        showSelectedLabel={false}
                        disabled={true}
                      />
                    </div>
                  </label>

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Address</p>
                    <Field
                      value={values.address}
                      name="address"
                      type="text"
                      autoComplete="off"
                      className={styles.input}
                      onChange={e => handleAddress(e, setFieldValue)}
                    />
                  </label>

                  <label className={styles.wrapperLable}>
                    <p className={styles.label}>Username</p>
                    <Field
                      value={values.username}
                      name="username"
                      type="text"
                      autoComplete="off"
                      className={styleUsername}
                      onChange={(e) => userNameChange(e, setFieldValue)}
                    />
                  </label>
                  {error && <p className={styles.error}>{error}</p>}
                  {updateSuccess ? <p className={styles.success}>Update Success</p> : null}
                  <div className={styles.wrapperButtons}>
                    <button className={styles.button} type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
          validationSchema={settings.schema}
          onSubmit={submitSettings}
        />
      </div>

      {!profile.isVerified && (
        <button
          className={styles.verificationButton}
          onClick={handleVerification}
        />
      )}
    </div>
  );
};
