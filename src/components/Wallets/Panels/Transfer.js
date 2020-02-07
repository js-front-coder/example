import React, { useState, useEffect } from 'react';
import cx from "classnames";

import styles from "../Wallets.module.scss";
import reverse from "theme/images/TopupRedeem/Topup/reverse.svg";

export const Transfer = ({
  transferValue,
  handleChangeSpend,
  currencyFrom,
  currenciesTo,
  handleExchangeButton
}) => {

  const getCurrencyDimo = cx(styles.label, styles.currencyLabel, {
    //[styles.activeLabel]: selectCurrency === 'Dimo'
  });

  const getCurrencydTZS = cx(styles.label, styles.currencyLabel, {
    //[styles.activeLabel]: selectCurrency === 'dTZS'
  });

  const getCurrencydUGX = cx(styles.label, styles.currencyLabel, {
    //[styles.activeLabel]: selectCurrency === 'dUGX'
  });

  const getCurrencyStyle = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: true
  });

  const [currencyTo, setCurrencyTo] = useState(currenciesTo);

  const handleChangeFrom = (e) => {
    handleChangeSpend(e.target.value, currencyFrom, currencyTo);
  };

  const handleSubmitForm = () => {
    handleExchangeButton(currencyFrom, currencyTo);
  };

  return (
    <>
    <div className={styles.mainInner}>
      <div className={styles.titleTransfer}>Transfer</div>
      <div className={styles.formWrapper}>
        <label className={styles.wrapperLabel}>
          <p className={styles.label}>Spend</p>
          <input
            value={transferValue.spend}
            type="number"
            placeholder="0"
            className={cx(styles.field, styles.fieldActive)}
            onChange={handleChangeFrom}
          />

          <div className={styles.fieldCoin}>{currencyFrom}</div>
        </label>
        <button className={styles.reverseButton}>
          <img src={reverse} alt={reverse} />
        </button>
        <label className={styles.wrapperLabel}>
          <div className={styles.wrapperGetInfo}>
            <p className={styles.label}>You get </p>
            <div>
                <span
                  className={`${styles.label} ${styles.currencyLabel} ${currencyTo === currenciesTo ? getCurrencyStyle : ''}`}
                  onClick={() => {
                    setCurrencyTo(currenciesTo);
                  }}
                >
                  {currenciesTo}
                </span>
                {/*<span*/}
                  {/*className={`${styles.label} ${styles.currencyLabel} ${currencyTo === currenciesTo ? getCurrencyStyle : ''}`}*/}
                  {/*onClick={() => {*/}
                    {/*setCurrencyTo(currenciesTo);*/}
                  {/*}}*/}
                {/*>*/}
                  {/*{currenciesTo}*/}
                {/*</span>*/}
            </div>
          </div>

          <input
            readOnly
            type="number"
            placeholder="0"
            value={transferValue.get}
            className={styles.field}
          />

          <div className={styles.fieldCoin}>
            {currencyTo}
          </div>
        </label>
      </div>
      <div className={styles.wrapperTransferButton}>
        <button
          className={styles.transferButton}
          onClick={handleSubmitForm}
        >
          Exchange
        </button>
      </div>
    </div>
    </>
  )
};