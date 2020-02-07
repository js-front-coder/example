// Core
import React from 'react';
import { connect } from 'react-redux';

import { sendActions } from 'bus/send/actions';
import { uiActions } from 'bus/ui/actions';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { ModalWalletView } from './ModalWalletView';

export const ModalWallet = ({ modal, closeModalWallet, setValueSlider }) => {
  const handleAction = () => {
    if (modal.type === 'Redeem') {
      closeModalWallet();
      history.push(book.topupRedeem.redeem);
    }
    if (modal.type === 'Send') {
      closeModalWallet();
      setValueSlider(1);
      history.push(book.send);
    }
  };
  return (
    <>
      {modal.status && (
        <ModalWalletView type={modal.type} handleAction={handleAction} />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  modal: state.ui.modalWallet
});

const mapDispatchToProps = {
  closeModalWallet: uiActions.closeModalWallet,
  setValueSlider: sendActions.setValueSlider
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWallet);
