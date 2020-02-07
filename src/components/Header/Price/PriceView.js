// Core
import React from "react";
import cx from "classnames";

import QRCode from "qrcode.react";
import QrModal from "../QrModal/QrModal";

import styles from "./Price.module.scss";
import { beautifyDimoNumber, beautifyDimoTitle } from "helper/beautifyDimo";

const Currency = ({ currency, amount }) => {
  if (currency == "DIMO") {
    currency = beautifyDimoTitle(amount);
    amount = beautifyDimoNumber(amount);
  }
  return (
    <div className={styles.currency}>
      <p className={styles.currencyAmount}>
        {+amount < 1 && +amount > 0
          ? (+amount).toFixed(5)
          : (+amount).toFixed(2)}
      </p>
      <span className={styles.currencyName}>{currency === 'dTZS' ? 'TZS' : currency === 'dUGX' ? 'UGX' : 'Dimo'}</span> {/* here need only currency - ChangeCurrency */}
    </div>
  );
};

export const PriceView = ({
  balances = {},
  qrValue = "https://www.google.com/",
  handleQRClick,
  statusModalCode,
  small
}) => {
  return (
    <div className={styles.currencyWrapper}>
      <div
        className={cx(styles.currencies, { [styles.currenciesSmall]: small })}
      >
        {Object.keys(balances).map(c => (
          <>
          {c !== 'DIMO' && <Currency key={c} currency={c} amount={balances[c]} />}  {/* hiddenDimo */}
          </>
        ))}
      </div>
      <QrModal
        qrValue={qrValue}
        statusModalCode={statusModalCode}
        closeModal={() => handleQRClick(false)}
      />
      <QRCode
        value={qrValue}
        className={styles.qrCode}
        onClick={() => {
          handleQRClick();
        }}
      />
    </div>
  );
};
