// Core
import React from 'react';

import TopupComponent from '../../Topup/Topup';
import { Navigation } from '../Navigation/Navigation';
import { WrapperSection, Container } from 'components/Common';


export default function () {
  return (
      <WrapperSection>
        <Container>
          <Navigation />
          <TopupComponent swapAllow={true}/>
        </Container>
      </WrapperSection>
  )
};