// Core
import React from 'react';

import { connect } from 'react-redux';
import { usersActions } from 'bus/users/actions';
import { bankInfo } from 'bus/redeem/selectors';
import { redeemActions } from 'bus/redeem/actions';

import { history } from 'helper/history';
import { book } from 'navigation/book';

import { WrapperSection, Container } from 'components/Common';
import { Navigation } from '../Navigation/Navigation';
import { RedeemBankView } from './RedeemBankView';

const RedeemBank = ({ amount, bankInfo, redeemPayment, getCurrency, currentCurrency }) => {
  const submitRedeemBank = data => {
    redeemPayment({
      amount,
      currency: getCurrency,
      getCurrency: currentCurrency,
      method: bankInfo._id,
      additional: data,
    });
  };

  const handleNumber = (value, setFieldValue) => {
    if (/^\d+$/.test(value) && value.length < 17) {
      setFieldValue('number', value);
    }
    if (value === '') {
      setFieldValue('number', '');
    }
  };

  const cancelRedeemBank = () => history.push(book.topupRedeem.redeem);

  const validateSwiftField = (e, value) => {
    if (/^[a-zA-Z0-9]+$/.test(e.target.value)) {
      return e.target.value;
    } else if (e.target.value === '') {
      return '';
    } else {
      return value;
    }
  };

  return (
    <WrapperSection>
      <Container>
        <Navigation />
        <RedeemBankView
          submitRedeemBank={submitRedeemBank}
          cancelRedeemBank={cancelRedeemBank}
          handleNumber={handleNumber}
          validateSwiftField={validateSwiftField}
        />
      </Container>
    </WrapperSection>
  );
};

const mapStateToProps = state => ({
  bankInfo: bankInfo(state),
  amount: state.redeem.getValue.spend,
  getCurrency: state.redeem.getValue.currency,
  currentCurrency: state.profile.user.currency
});

const mapDispatchToProps = {
  fillNumberUsers: usersActions.fillNumberUsersAsync,
  redeemPayment: redeemActions.redeemPaymentAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedeemBank);
