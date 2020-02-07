// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  isValidPhoneNumber,
  formatPhoneNumber
} from 'react-phone-number-input';

import { authActions } from 'bus/auth/actions';

import { SignUpView } from './SignUpView';
import EnterLoader from '../EnterLoader/EnterLoader';

const SignUp = ({
                  signUpAsync,
                  errorMessage,
                  loaderModalStatus
                  // handleForgotPasswordError,
                  // handleLoginError
                }) => {
  const [phone, phoneChange] = useState('');

  // useEffect(() => {
  //   handleForgotPasswordError('');
  //   handleLoginError('');
  // }, [handleForgotPasswordError, handleLoginError]);

  const handlePhoneChange = value => {
    phoneChange(formatPhoneNumber(value, 'International'));
  };

  const submitSignUp = credentials => {
    if (isValidPhoneNumber(phone)) {
      signUpAsync({
        phone,
        email: credentials.email,
        password: credentials.password,
        type: credentials.type
      });
    }
  };

  return (
    <>
      <SignUpView
        phone={phone}
        submitSignUp={submitSignUp}
        handlePhoneChange={handlePhoneChange}
        errorMessage={errorMessage}
      />
      {loaderModalStatus && <EnterLoader type="signUp"/>}
    </>
  );
};
const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessageSignUp,
  loaderModalStatus: state.auth.loaderModalStatus,
});
const mapDispatchToProps = {
  signUpAsync: authActions.signUpAsync,
  // handleForgotPasswordError: authActions.handleForgotPasswordError,
  // handleLoginError: authActions.handleLoginError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
