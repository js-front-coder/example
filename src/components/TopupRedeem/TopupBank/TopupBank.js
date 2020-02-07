// Core
import React from 'react';
import { connect } from 'react-redux';

import { topupActions } from 'bus/topup/actions';
import { bankInfo } from 'bus/topup/selectors';

import { WrapperSection, Container } from 'components/Common';
import TopupBankView from '../../TopupBank/TopupBank';
import { Navigation } from '../Navigation/Navigation';

export default () => {
  return (
    <WrapperSection>
      <Container>
        <Navigation />
        <TopupBankView/>
      </Container>
    </WrapperSection>
  );
};