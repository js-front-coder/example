// Core
import React from 'react';
import { WrapperSection, Container, ModalWallet } from 'components/Common';
import style from './Chat.module.scss';
import io from 'socket.io-client';

import { ChatView } from './ChatView';

const Chat = () => {

  return (
      <WrapperSection className={style.customWrapper}>
        <Container className={style.customContainer}>
          <ChatView />
        </Container>
      </WrapperSection>
      );
};

export default Chat;