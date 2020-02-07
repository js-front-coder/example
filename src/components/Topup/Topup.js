// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from 'helper/history';
import { book } from 'navigation/book';

import { TopupView } from './TopupView';
import { Button } from 'components/Common';

import './Topup.scss';

import { topupActions } from 'bus/topup/actions';
import styles from './Topup.module.scss';
import cx from "classnames";
import reverse from 'theme/images/TopupRedeem/Topup/reverse.svg';
import SVG from "react-inlinesvg";
import bank from 'theme/images/TopupRedeem/Topup/bank.svg';
import cashImg from 'theme/images/TopupRedeem/Topup/cash.svg';

const Topup = (
  {
    physicalCurrency,
    topup: { topupParams, dataMethods },
    topupExchangeAsync,
    activeCurrency,
    availableCurrencies,
    topupMethodsAsync,
    resetStore,
  }
) => {
  const [spend, setSpend] = useState('');
  const [currencyTo, setCurrencyTo] = useState(activeCurrency);
  const [topupMethod, setTopupMethod] = useState('');

  const handleChangeSpend = e => {
    console.log('ON_CHANGE_TOPUP', e.target.value, physicalCurrency, currencyTo);
    setSpend(e.target.value);
    topupExchangeAsync({
      spend: e.target.value,
      currencyFrom: physicalCurrency,
      currencyTo: currencyTo.symbol,
    });
  };

  const handleExchange = () => history.push(book.topupRedeem.redeem);

  const handleSelectCurrency = currencyState => {
    setCurrencyTo(currencyState);
    topupExchangeAsync({
      spend: spend,
      currencyFrom: physicalCurrency,
      currencyTo: currencyState.symbol,
    });
  };

  const handleBankButton = method => {
    setTopupMethod(method);
  };

  const handleCashButton = () => {
    history.push(book.topupRedeem.topupCash);
  };

  const handleTopup = () => {
    if (topupParams.get > 0) {
      // history.push(bankAddr !== undefined ? bankAddr : book.topupRedeem.topupBank);
      history.push(book.topupRedeem.topupBank);
    }
  };

  useEffect(() => {
    topupMethodsAsync();
    return resetStore;
  }, []);


  // const handleChangeSpend = e => {
//     if (/^(?=.*\d)\d*(?:\.\d{0,2})?$/.test(e.target.value) && e.target.value.length < 11) {
//       setSpend(e.target.value);
//       topupExchangeAsync(e.target.value);
//     } else if (e.target.value === '') {
//       setSpend('');
//       topupExchangeAsync(0);
//     }
//   };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainInner}>
        <div className={styles.formWrapper}>
          <label className={styles.wrapperLabel}>
            <p className={styles.label}>Spend</p>
            <input
              // value={topupParams.spend}
              value={spend}
              type="text"
              placeholder="0"
              className={cx(styles.field, styles.fieldActive)}
              onChange={handleChangeSpend}
            />

            <div className={styles.fieldCoin}>{physicalCurrency}</div>
          </label>

          <button className={styles.reverseButton}
            onClick={handleExchange}>

            <img src={reverse} alt={reverse}/>

          </button>

          <label className={styles.wrapperLabel}>
            <div className={styles.wrapperGetInfo}>
              <p className={styles.label}>You get </p>
              <div>
                {Object.keys(availableCurrencies).map(key => {
                  const currencyState = availableCurrencies[key];
                  const currencyLabel = availableCurrencies[key].label;

                  return (
                    <span
                      className={`${styles.label} ${styles.currencyLabel} ${currencyTo.symbol === currencyState.symbol ? styles.activeLabel : ''}` }
                      onClick={() => {handleSelectCurrency(currencyState)}}
                    >
                      {currencyLabel}
                    </span>
                  )
                })}
              </div>
            </div>


            <input
              readOnly
              type="number"
              placeholder="0"
              value={(+topupParams.get).toFixed(2)}
              // value={selectCurrency}
              className={styles.field}
            />

            <div className={styles.fieldCoin}>{currencyTo.label}</div>
          </label>
        </div>
        <p className={styles.mainText}>Choose a topup method</p>
        <div className={styles.methodButtons}>
          {/* todo: need description how it works from backend dev */}
          {dataMethods.map(
            method => (
              // method.name === 'Bank' && (
                <button
                  key={method._id}
                  onClick={() => handleBankButton(method.name)}
                  className={cx(styles.bankButton, {
                    [styles.bankButtonActive]: topupMethod === 'Bank'
                    // [styles.bankButtonActive]: method._id === isActiveBank
                  })}
                >
                  <SVG src={bank}/>
                  {method.name}
                </button>
              )
          )}
          {/*<button*/}
          {/*    onClick={handleCardButton}*/}
          {/*    className={cx(styles.cardButton, {*/}
          {/*        [styles.cardButtonActive]: isActiveCard*/}
          {/*    })}*/}
          {/*>*/}
          {/*    <SVG src={card}/>*/}
          {/*    Credit Card*/}
          {/*</button>*/}
          <button
            onClick={handleCashButton}
            className={cx(styles.cashButton, {
            //   [styles.cashButtonActive]: isActiveCash
              [styles.cashButtonActive]: topupMethod === 'Cash'
            })}
          >
            <SVG src={cashImg}/>
            Cash
          </button>
        </div>

        {topupMethod === 'Bank' && (
          <div className={styles.ticket}>
            <h3 className={styles.ticketTitle}>Recept</h3>
            <div className={styles.ticketInfo}>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You spend</div>
                <div className={styles.ticketInfoItemRight}>
                  {spend} {physicalCurrency}
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You get</div>
                <div className={styles.ticketInfoItemRight}>
                  {(+topupParams.get).toFixed(2)} {currencyTo.label}
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Payment method</div>
                <div className={styles.ticketInfoItemRight}>{topupMethod}</div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Fees</div>
                <div className={styles.ticketInfoItemRight}>{topupParams.fee}</div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>VAT</div>
                <div className={styles.ticketInfoItemRight}>{topupParams.vat}</div>
              </div>
            </div>
            <div className={styles.ticketInfoTotal}>
              <div className={styles.ticketInfoTotalLeft}>Total</div>
              <div className={styles.ticketInfoTotalRight}>
                {topupParams.total} {physicalCurrency}
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <Button blue value="Top up"
                      handleAction={handleTopup}
              />
              {/*<button>Top Up</button>*/}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


//todo: refactor this component

// const Topup = ({
//   physicalCurrency,
//   topup,
//   topupExchangeAsync,
//   topupMethodsAsync,
//   setTopupCurrency,
//   swapAllow,
//   to,
//   bankAddr,
//   currentCountry,
//   selectCurrency,
//   resetStore
// }) => {
//   const [isMounted, setMounted] = useState(false);
//   const [isWeCashUpOpen, setWeCashUpOpen] = useState(false);
//   const [isReceptOpen, setReceptOpen]       = useState(false);
//   const [paymentMethod, setPaymentMethod]   = useState('bank');
//   const [spend, setSpend]                   = useState('');
//   //const [selectCurrency, setSelectCurrency] = useState(to !== undefined ? to : 'Dimo');
//   const [isActiveBank, setIsActiveBank]     = useState(0);
//   const [isActiveCard, setIsActiveCard]     = useState(false);
//   const [isActiveCash, setIsActiveCash]     = useState(false);
//
//   useEffect(() => {
//     topupMethodsAsync();
//     if (isWeCashUpOpen) {
//       setTimeout(() => {
//         const button = document.getElementById('WCUpaymentButton');
//         // button.click();
//
//         setWeCashUpOpen(true);
//       }, 1000)
//     }
//     if(!isMounted && to){
//         setTopupCurrency(to);
//         setMounted(true);
//     }
//
//   }, [topupMethodsAsync, isWeCashUpOpen, to]);
//
//   const handleBankButton     = id => {
//     setReceptOpen(true);
//     setPaymentMethod('bank');
//     setIsActiveBank(id);
//     setIsActiveCard(false);
//   };
//   const handleCardButton     = () => {
//     setWeCashUpOpen(true);
//     setPaymentMethod('card');
//     setIsActiveBank(false);
//     setIsActiveCard(true);
//   };
//   const handleCashButton     = () => {
//     history.push(book.topupRedeem.topupCash);
//     setIsActiveCash(false);
//     setIsActiveBank(false);
//     setIsActiveCard(false);
//   };
//   const handleSelectCurrency = async type => {
//     //await setSelectCurrency(type);
//     await setTopupCurrency(type === 'Dimo' ? 'DIMO' : type);
//     await topupExchangeAsync(spend);
//   };
//
//   const handleExchange = () => history.push(book.topupRedeem.redeem);
//
//   const handleChangeSpend = e => {
//     if (/^(?=.*\d)\d*(?:\.\d{0,2})?$/.test(e.target.value) && e.target.value.length < 11) {
//       setSpend(e.target.value);
//       topupExchangeAsync(e.target.value);
//     } else if (e.target.value === '') {
//       setSpend('');
//       topupExchangeAsync(0);
//     }
//   };
//
//   const handleTopup = () => {
//     if (topup.getValue.get > 0) {
//       history.push(bankAddr !== undefined ? bankAddr : book.topupRedeem.topupBank);
//     }
//   };
//
//   return (
//     //<form action="https://dimo.cash/api/v1/client/wecashup" method="POST"
//     //   id="wecashup">
//     <TopupView
//       isActiveBank={isActiveBank}
//       isActiveCard={isActiveCard}
//       isActiveCash={isActiveCash}
//       spend={spend}
//       topup={topup}
//       selectCurrency={selectCurrency}
//       handleTopup={handleTopup}
//       isReceptOpen={isReceptOpen}
//       handleExchange={handleExchange}
//       handleBankButton={handleBankButton}
//       handleCardButton={handleCardButton}
//       handleCashButton={handleCashButton}
//       handleChangeSpend={handleChangeSpend}
//       handleSelectCurrency={handleSelectCurrency}
//       isWeCashUpOpen={isWeCashUpOpen}
//       swapAllow={swapAllow}
//       currentCountry={currentCountry}
//       physicalCurrency={physicalCurrency}
//       resetStore={resetStore}
//     />
//     // </form>
//   );
// };

const mapStateToProps = state => ({
  topup: state.topup,
  currentCountry: state.profile.user.country,
  physicalCurrency: state.profile.user.currency,
  selectCurrency: state.topup.topupParams.currency,
  activeCurrency: state.currency.activeCurrency,
  availableCurrencies: state.currency.availableCurrencies,
});

const mapDispatchToProps = {
  topupExchangeAsync: topupActions.topupExchangeAsync,
  topupMethodsAsync: topupActions.topupMethodsAsync,
  setTopupCurrency: topupActions.setTopupCurrency,
  resetStore: topupActions.resetStore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topup);
