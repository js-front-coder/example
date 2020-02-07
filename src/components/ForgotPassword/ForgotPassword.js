// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { authActions } from 'bus/auth/actions';
import { ForgotPasswordView } from './ForgotPasswordView';
import { SuccesModal } from './Modal/Succes';

const ForgotPassword = ({
  status,
  forgotPasswordAsync,
  closeInboxModal,
  handleLoginError,
  errorMessage
}) => {
  const [email, changeEmail] = useState('');
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    handleLoginError('');
    if (window.innerWidth <= 768) {
      setMobile(true);
    }
  }, [handleLoginError]);

  const submitForgot = data => {
    changeEmail(data.email);
    forgotPasswordAsync(data);
  };

  const handleCloseModal = () => {
    closeInboxModal();
    history.push(book.login);
  };

  return (
    <>
      <ForgotPasswordView
        mobile={mobile}
        submitForgot={submitForgot}
        errorMessage={errorMessage}
      />
      <SuccesModal
        email={email}
        status={status}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

const mapStateToProps = state => ({
  status: state.auth.statusModalEmail,
  errorMessage: state.auth.errorMessageForgotPassword
});

const mapDispatchToProps = {
  forgotPasswordAsync: authActions.forgotPasswordAsync,
  closeInboxModal: authActions.closeInboxModal,
  handleLoginError: authActions.handleLoginError
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
