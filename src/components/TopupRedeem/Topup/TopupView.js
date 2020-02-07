// Core
import React from 'react';
import cx from 'classnames';

import { Button } from 'components/Common';
import reverse from 'theme/images/TopupRedeem/Topup/reverse.svg';

import styles from './Topup.module.scss';

export const TopupView = ({
  topup: { getValue, dataMethods },
  spend,
  selectCurrency,
  handleTopup,
  isReceptOpen,
  handleExchange,
  handleBankButton,
  handleChangeSpend,
  handleSelectCurrency
}) => {
  const getCurrencyDtzs = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'dTZS'
  });

  const getCurrencyDimo = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'Dimo'
  });

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainInner}>
        <div className={styles.formWrapper}>
          <label className={styles.wrapperLabel}>
            <p className={styles.label}>Spend</p>
            <input
              value={spend}
              type="text"
              placeholder="0"
              className={styles.field}
              onChange={handleChangeSpend}
            />

            <div className={styles.fieldCoin}>TZS</div>
          </label>
          <button className={styles.reverseButton} onClick={handleExchange}>
            <img src={reverse} alt={reverse} />
          </button>
          <label className={styles.wrapperLabel}>
            <div className={styles.wrapperGetInfo}>
              <p className={styles.label}>You get </p>
              <div>
                <span
                  className={getCurrencyDtzs}
                  onClick={() => handleSelectCurrency('dTZS')}
                >
                  ${` TZS `}  {/* dTZS - ChangeCurrency */}
                </span>
                <span
                  className={getCurrencyDimo}
                  onClick={() => handleSelectCurrency('Dimo')}
                >
                  {` Dimo `}
                </span>
              </div>
            </div>

            <input
              readOnly
              type="number"
              placeholder="0"
              value={getValue.get}
              className={styles.field}
            />

            <div className={styles.fieldCoin}>{selectCurrency}</div>
            {selectCurrency === 'Dimo' ? (
              <div className={styles.exchangeInfo}>1 TZS = 1 Dimo</div>
            ) : (
              <div className={styles.exchangeInfo}>1 TZS = 1 TZS</div> // 1TZS = 1dTZS - ChangeCurrency
            )}
          </label>
        </div>

        <p className={styles.mainText}>Choose a topup methode</p>
        {dataMethods.map(
          method =>
            method.name === 'Bank' && (
              <button
                key={method._id}
                onClick={handleBankButton}
                className={styles.bankButton}
              >
                Bank
              </button>
            )
        )}

        {isReceptOpen && (
          <div className={styles.ticket}>
            <h3 className={styles.ticketTitle}>Recept</h3>
            <div className={styles.ticketInfo}>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You spend</div>
                <div className={styles.ticketInfoItemRight}>
                  {getValue.spend} TZS
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>You get</div>
                <div className={styles.ticketInfoItemRight}>
                  {getValue.get} {selectCurrency}
                </div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Paymant methode</div>
                <div className={styles.ticketInfoItemRight}>Credit card</div>
              </div>
              <div className={styles.ticketInfoItem}>
                <div className={styles.ticketInfoItemLeft}>Fees & VAT</div>
                <div className={styles.ticketInfoItemRight}>{getValue.fee}</div>
              </div>
            </div>
            <div className={styles.ticketInfoTotal}>
              <div className={styles.ticketInfoTotalLeft}>Total</div>
              <div className={styles.ticketInfoTotalRight}>
                {getValue.total} {selectCurrency}
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <Button blue value="Top up" handleAction={handleTopup} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
