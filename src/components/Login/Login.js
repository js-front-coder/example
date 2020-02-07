// Core
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  isValidPhoneNumber,
  formatPhoneNumber
} from 'react-phone-number-input';

import { authActions } from 'bus/auth/actions';

import { LoginView } from './LoginView';
import EnterLoader from '../EnterLoader/EnterLoader';

const Login = ({ loginAsync, handleForgotPasswordError, errorMessage, loaderModalStatus }) => {
  const [phone, phoneChange] = useState('');

  useEffect(() => {
    handleForgotPasswordError('');
  }, [handleForgotPasswordError]);

  const handlePhoneChange = value => {
    phoneChange(formatPhoneNumber(value, 'International'));
  };

  const submitLogin = credentials => {
    if (isValidPhoneNumber(phone)) {
      loginAsync({
        phone,
        password: credentials.password
      });
    }
  };

  return (
    <>
      <LoginView
        phone={phone}
        submitLogin={submitLogin}
        handlePhoneChange={handlePhoneChange}
        errorMessage={errorMessage}
      />
      {loaderModalStatus && <EnterLoader type="login"/>}
    </>
  );
};
const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessageLogin,
  loaderModalStatus: state.auth.loaderModalStatus,
});
const mapDispatchToProps = {
  loginAsync: authActions.loginAsync,
  handleForgotPasswordError: authActions.handleForgotPasswordError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
