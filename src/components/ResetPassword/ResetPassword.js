// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { book } from 'navigation/book';
import { history } from 'helper/history';

import { authActions } from 'bus/auth/actions';
import { ResetPasswordView } from './ResetPasswordView';
import { ErrorModal } from './Modal/ErrorModal';

const ResetPassword = ({
  location,
  closeModal,
  statusModal,
  statusResponse,
  resetPasswordAsync
}) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true);
    }
  }, []);

  const submitReset = ({ password }) => {
    resetPasswordAsync({
      data: queryString.parse(location.search).data,
      password
    });
  };

  const backToForgot = () => {
    history.push(book.forgotPassword);
  };

  return (
    <>
      <ResetPasswordView mobile={mobile} submitReset={submitReset} />
      <ErrorModal
        closeModal={closeModal}
        statusModal={statusModal}
        backToForgot={backToForgot}
        statusResponse={statusResponse}
      />
    </>
  );
};

const mapStateToProps = state => ({
  statusModal: state.auth.errorReset.statusModalReset,
  statusResponse: state.auth.errorReset.responseStatus
});

const mapDispatchToProps = {
  resetPasswordAsync: authActions.resetPasswordAsync,
  closeModal: authActions.closeResetPasswordModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
