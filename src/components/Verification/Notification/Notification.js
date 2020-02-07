// Core
import React from 'react';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { NotificationView } from './NotificationView';

import { WrapperSection, Container } from 'components/Common';

const Notification = () => {
  const handleContinue = () => {
    history.push(book.settings);
  };

  const handleSkipKYC = () => {
    history.push(book.topupRedeem.topupRedeem);
  };

  return (
    <WrapperSection>
      <Container>
        <NotificationView
          handleContinue={handleContinue}
          handleSkipKYC={handleSkipKYC}
        />
      </Container>
    </WrapperSection>
  );
};

export default Notification;
