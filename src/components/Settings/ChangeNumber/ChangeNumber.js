// Core
import React from 'react';
import { connect } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { profileActions } from 'bus/profile/actions';

import { ChangeNumberView } from './ChangeNumberView';

const ChangeNumber = ({
  phone,
  handlePhoneChange,
  closeModalNumber,
  openModalSms,
  verifyPhoneAsync
}) => {
  const submitNumber = () => {
    if (isValidPhoneNumber(phone)) {
      verifyPhoneAsync({ phone });
      closeModalNumber();
      openModalSms();
    }
  };

  return (
    <ChangeNumberView
      phone={phone}
      submitNumber={submitNumber}
      closeModalNumber={closeModalNumber}
      handlePhoneChange={handlePhoneChange}
    />
  );
};

const mapDispatchToProps = {
  closeModalNumber: profileActions.closeModalNumber,
  openModalSms: profileActions.openModalSms,
  verifyPhoneAsync: profileActions.verifyPhoneAsync
};

export default connect(
  null,
  mapDispatchToProps
)(ChangeNumber);
