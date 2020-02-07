// Core
import React from 'react';
import cx from 'classnames';

import reverse from "theme/images/TopupRedeem/Topup/reverse.svg";
import bank from "theme/images/TopupRedeem/Topup/bank.svg";
// import card from "theme/images/TopupRedeem/Topup/credit-card.svg";
import cashImg from "theme/images/TopupRedeem/Topup/cash.svg";

import styles from "./Redeem.module.scss";
import SVG from "react-inlinesvg";

export const RedeemView = ({
                             redeem: { getValue, dataMethods },
                             spend,
                             selectCurrency,
                             handleRedeem,
                             isReceptOpen,
                             handleExchange,
                             handleBankButton,
                             handleChangeSpend,
                             handleSelectCurrency,
                             isActiveCard,
                             isActiveBank,
                             handleCashButton,
                             currentCountry,
                             physicalCurrency
                           }) => {

  const getCurrencyDtzs = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === "dTZS"
  });

  const getCurrencyDimo = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'Dimo'
  });

  const getCurrencydUGX = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'dUGX'
  });

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainInner}>
        <div className={styles.formWrapper}>
          <label className={styles.wrapperLabel}>
            <div className={styles.wrapperGetInfo}>
              <p className={styles.label}>Spend</p>
              <div>
                {currentCountry === 'TZ' && <span
                  className={getCurrencyDtzs}
                  onClick={() => handleSelectCurrency('dTZS')}
                >{' '}TZS{' '}</span>} {/* here need dTZS - ChangeCurrency */}
                {/*<span*/}
                {/*  className={getCurrencyDimo}*/}
                {/*  onClick={() => handleSelectCurrency('Dimo')}*/}
                {/*>{' '}*/}
                {/*  Dimo{' '}*/}
                {/*</span>*/}
                {currentCountry === 'UG' && <span
                  className={getCurrencydUGX}
                  onClick={() => handleSelectCurrency('dUGX')}
                >
                                {' '}
                  UGX{' '} {/* here need dUGX - ChangeCurrency */}
                                </span>}
              </div>
            </div>
            <input
              value={spend}
              type="text"
              placeholder="0"
              className={cx(styles.field, styles.fieldActive)}
              onChange={handleChangeSpend}
            />
            <div
              className={styles.fieldCoin}>{selectCurrency === 'dTZS' ? 'TZS' : selectCurrency === 'dUGX' ? 'UGX' : 'Dimo'}</div>
            {/* here need only selectCurrency - ChangeCurrency */}
            {/*{selectCurrency === 'Dimo' && <div className={styles.exchangeInfo}>1 TZS = 1 Dimo</div>}*/}
            {/*{selectCurrency === 'dTZS' && <div className={styles.exchangeInfo}>1 TZS = 1 dTZS</div>}*/}
            {/*{selectCurrency === 'dUGX' && <div className={styles.exchangeInfo}>1 TZS = 1 dUGX</div>}*/}

          </label>
          <button className={styles.reverseButton} onClick={handleExchange}>
            <img src={reverse} alt={reverse}/>
          </button>
          <label className={styles.wrapperLabel}>
            <div className={styles.wrapperGetInfo}>
              <p className={styles.label}>You get </p>
            </div>
            <input
              readOnly
              type="number"
              placeholder="0"
              value={getValue.get}
              className={styles.field}
            />
            <div className={styles.fieldCoin}>{physicalCurrency}</div>
          </label>
        </div>

        <p className={styles.mainText}>Choose a withdraw method</p>

        <div className={styles.methodButtons}>
          {dataMethods.map(
            method =>
              method.name === "Bank" && (
                <button
                  key={method._id}
                  onClick={() => handleBankButton(method._id)}
                  className={cx(styles.bankButton, {
                    [styles.bankButtonActive]: method._id === isActiveBank
                  })}
                >
                  <SVG src={bank}/>
                  Bank
                </button>
              )
          )}
          <button
            onClick={handleCashButton}
            className={cx(styles.cardButton, {
              [styles.cardButtonActive]: isActiveCard
            })}
          >
            <SVG src={cashImg}/>
            Cash
          </button>
        </div>

        {isReceptOpen && (
          <div className={styles.ticket}>
            <h3 className={styles.ticketTitle}>Recept</h3>
            <div className={styles.ticketInfo}>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You spend</div>
                <div className={styles.ticketInfoItemRight}>
                  {getValue.spend} {selectCurrency === 'dTZS' ? 'TZS' : selectCurrency === 'dUGX' ? 'UGX' : 'Dimo'} {/* here need only selectCurrency - ChangeCurrency */}
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You get</div>
                <div className={styles.ticketInfoItemRight}>
                  {getValue.get} {physicalCurrency}
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Payment method</div>
                <div className={styles.ticketInfoItemRight}>Bank account</div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Fees</div>
                <div className={styles.ticketInfoItemRight}>{getValue.fee}</div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>VAT</div>
                <div className={styles.ticketInfoItemRight}>{getValue.vat}%</div>
              </div>
            </div>
            <div className={styles.ticketInfoTotal}>
              <div className={styles.ticketInfoTotalLeft}>Total</div>
              <div className={styles.ticketInfoTotalRight}>
                {getValue.total} {selectCurrency === 'dTZS' ? 'TZS' : selectCurrency === 'dUGX' ? 'UGX' : 'Dimo'} {/* here need only selectCurrency - ChangeCurrency */}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.ticketTopupButton}
                onClick={handleRedeem}
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
