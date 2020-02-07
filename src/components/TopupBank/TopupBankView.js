// Core
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';

import { Button } from 'components/Common';
import copySrc from 'theme/images/TopupRedeem/Bank/copy.svg';
import styles from './TopupBank.module.scss';
import {book} from "../../navigation/book";

//todo: transfer code to the main component

export const TopupBankView = ({
  bank: {
    info: { accountN = '', swift = '', bank = '', account = '' },
    reference = ''
  },
  getValue = '',
  handlePaymentMethod,
  allow,
  currentCurrency,
  totalAmount
}) => (
  <div className={styles.wrapperBank}>
    <h1 className={styles.title}>Top-up via Bank Account</h1>

    <div className={styles.underTitle}>- May take up to 6 business days -</div>

    <div className={styles.block}>
      <div className={styles.wrapperItem}>
        <div className={styles.titleItem}>Account Holder</div>
        <div className={styles.value}>{account}</div>

        <CopyToClipboard text={account}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>

      <div className={styles.wrapperItem}>
        <div className={styles.titleItem}>Bank</div>
        <div className={styles.value}>{bank}</div>

        <CopyToClipboard text={bank}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>

      <div className={styles.wrapperItem}>
        <div className={styles.titleItem}>Account No.</div>
        <div className={styles.value}>{accountN}</div>

        <CopyToClipboard text={accountN}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>

      <div className={styles.wrapperItem}>
        <div className={styles.titleItem}>SWIFT</div>
        <div className={styles.value}>{swift}</div>

        <CopyToClipboard text={swift}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>

      <div className={styles.wrapperItem}>
        <div className={styles.titleItem}>Reference</div>
        <div className={styles.value}>{reference}</div>

        <CopyToClipboard text={reference}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>

      <div className={styles.wrapperButton}>
        <Button
            blue
            value="Payment done"
            handleAction={handlePaymentMethod}
            disabled={!allow}
            disabledReason={'Should input your first and last names'}
        />
        {!allow && <p style={{marginTop: 10}}>Go to <Link to={book.settings}> settings </Link> to input necessary fields</p>}
      </div>

      <div className={`${styles.wrapperItem} ${styles.last}`}>
        <div className={styles.titleItem}>Total amount</div>
        <div className={styles.value}>{totalAmount} {currentCurrency}</div>

        <CopyToClipboard text={getValue}>
          <img className={styles.copy} src={copySrc} alt="copy" />
        </CopyToClipboard>
      </div>
    </div>
  </div>
);
