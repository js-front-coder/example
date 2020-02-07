// Core
import React from 'react';

import { connect } from 'react-redux';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { Title } from '../Title/Title';
import Steps from '../Steps/Steps';
import { WrapperSection, Container } from 'components/Common';

import { StatusView } from './StatusView';

const Status = ({ kyc }) => {
  const handleBack = () => {
    history.push(book.verification.passport);
  };

  return (
    <WrapperSection>
      <Container>
        <Title />
        <Steps />
        <StatusView handleBack={handleBack} kyc={kyc} />
      </Container>
    </WrapperSection>
  );
};

const mapStateToProps = state => ({
  kyc: state.profile.user.kyc || { status: '' }
});

export default connect(mapStateToProps)(Status);
