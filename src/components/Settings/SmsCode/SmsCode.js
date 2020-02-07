// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { profileActions } from 'bus/profile/actions';

import { SmsCodeView } from './SmsCodeView';

const SmsCode = ({
  phone,
  verifyPhoneAsync,
  closeModalSms,
  changeNumberAsync
}) => {
  const [resend, resendChange] = useState(10);

  useEffect(() => {
    if (resend > 0) {
      const timeout = setTimeout(() => resendChange(resend - 1), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [resend]);

  const submitSms = ({ sms }) => {
    resendChange(0);
    closeModalSms();
    changeNumberAsync({ code: sms });
  };

  const handleResend = () => {
    verifyPhoneAsync({ phone });
    resendChange(10);
  };

  return (
    <SmsCodeView
      resend={resend}
      submitSms={submitSms}
      handleResend={handleResend}
      closeModalSms={closeModalSms}
    />
  );
};

const mapDispatchToProps = {
  closeModalSms: profileActions.closeModalSms,
  changeNumberAsync: profileActions.changeNumberAsync,
  verifyPhoneAsync: profileActions.verifyPhoneAsync
};

export default connect(
  null,
  mapDispatchToProps
)(SmsCode);
