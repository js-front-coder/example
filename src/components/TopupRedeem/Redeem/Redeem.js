// Core
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { history } from "helper/history";
import { book } from "navigation/book";

import { RedeemView } from "./RedeemView";
import { Navigation } from "../Navigation/Navigation";
import { WrapperSection, Container, ModalWallet } from "components/Common";

import { redeemActions } from "bus/redeem/actions";
import { TopupView } from "../../Topup/TopupView";

const Redeem = ({
  redeem,
  redeemExchangeAsync,
  redeemMethodsAsync,
  setRedeemCurrency,
  currentCountry,
  physicalCurrency
}) => {
  useEffect(() => {
    redeemMethodsAsync();
    // return () => {
    //   redeemExchangeAsync(0);
    // }
  }, [redeemMethodsAsync]);

  const [isReceptOpen, setReceptOpen] = useState(false);
  const [spend, setSpend] = useState("");
  // const [selectCurrency, setSelectCurrency] = useState("Dimo");   * hiddenDimo *
  const [selectCurrency, setSelectCurrency] = useState(currentCountry === 'TZ' ? 'dTZS' : 'dUGX');   // * hiddenDimo *
  const [isActiveBank, setIsActiveBank] = useState(0);
  const [isActiveCard, setIsActiveCard] = useState(false);

  const handleBankButton = id => {
    setReceptOpen(true);
    setIsActiveCard(false);
    setIsActiveBank(id);
  };
  const handleCashButton = () => {
      history.push(book.topupRedeem.redeemCash);
  };
  const handleSelectCurrency = async type => {
    await setSelectCurrency(type);
    await setRedeemCurrency(type === "Dimo" ? "DIMO" : type);
    await redeemExchangeAsync(spend);
  };

  const handleExchange = () => history.push(book.topupRedeem.topup);

  const handleChangeSpend = e => {
    if (
      /^(?=.*\d)\d*(?:\.\d{0,2})?$/.test(e.target.value) &&
      e.target.value.length < 11
    ) {
      setSpend(e.target.value);
      redeemExchangeAsync(e.target.value);
    } else if (e.target.value === "") {
      setSpend("");
      redeemExchangeAsync(0);
    }
  };

  const handleRedeem = () => {
    if (redeem.getValue.get > 0) {
      history.push(book.topupRedeem.redeemBank);
    }
  };

  return (
    <>
      <WrapperSection>
        <Container>
          <Navigation />
          <RedeemView
            isActiveBank={isActiveBank}
            isActiveCard={isActiveCard}
            spend={spend}
            redeem={redeem}
            selectCurrency={selectCurrency}
            handleRedeem={handleRedeem}
            isReceptOpen={isReceptOpen}
            handleExchange={handleExchange}
            handleBankButton={handleBankButton}
            handleCashButton={handleCashButton}
            handleChangeSpend={handleChangeSpend}
            handleSelectCurrency={handleSelectCurrency}
            currentCountry={currentCountry}
            physicalCurrency={physicalCurrency}
          />
        </Container>
      </WrapperSection>
      <ModalWallet />
    </>
  );
};

const mapStateToProps = state => ({
  redeem: state.redeem,
  currentCountry: state.profile.user.country,
  physicalCurrency: state.profile.user.currency
});

const mapDispatchToProps = {
  redeemExchangeAsync: redeemActions.redeemExchangeAsync,
  redeemMethodsAsync: redeemActions.redeemMethodsAsync,
  setRedeemCurrency: redeemActions.setRedeemCurrency
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Redeem);
