// Core
import React from 'react';
import {connect} from 'react-redux';

import {topupActions} from 'bus/topup/actions';
import {bankInfo} from 'bus/topup/selectors';

import { Button } from 'components/Common';

import {TopupBankView} from './TopupBankView';
import styles from './TopupBank.module.scss';
import { CopyToClipboard } from "react-copy-to-clipboard";
import copySrc from 'theme/images/TopupRedeem/Bank/copy.svg';
import { Link } from "react-router-dom";
import {book} from "../../navigation/book";

//todo: refactor this component

const TopupBank = ({
  bank,
  getValue,
  spendValue,
  topupPaymentAsync,
  goto,
  getCurrency,
  allowPayment,
  currentCurrency,
  totalAmount
}) => {
  const handlePaymentMethod = () => {
    // topupPaymentAsync({
    //   amount: spendValue,
    //   getCurrency,
    //   currency: currentCurrency,
    //   method: bank._id,
    //   additional: { reference: bank.reference }
    // }, goto);
  };

  console.log('BANK', bank.name);

  return (
    <div className={styles.wrapperBank}>
      <h1 className={styles.title}>Top-up via Bank Account</h1>

      <div className={styles.underTitle}>- May take up to 6 business days -</div>

      <div className={styles.block}>
        <div className={styles.wrapperItem}>
          <div className={styles.titleItem}>Account Holder</div>
          {/*<div className={styles.value}>{bank.info.account}</div>*/}
          {/*<div className={styles.value}>{account}</div>*/}

          {/*<CopyToClipboard text={account}>*/}
          <CopyToClipboard text={'account'}>
            <img className={styles.copy} src={copySrc} alt="copy" />
          </CopyToClipboard>
        </div>

        <div className={styles.wrapperItem}>
          <div className={styles.titleItem}>Bank</div>
          <div className={styles.value}>{'bank'}</div>
          {/*<div className={styles.value}>{bank}</div>*/}

          {/*<CopyToClipboard text={bank}>*/}
          <CopyToClipboard text={'bank'}>
            <img className={styles.copy} src={copySrc} alt="copy" />
          </CopyToClipboard>
        </div>

        <div className={styles.wrapperItem}>
          <div className={styles.titleItem}>Account No.</div>
          {/*<div className={styles.value}>{accountN}</div>*/}
          <div className={styles.value}>{'accountN'}</div>

          {/*<CopyToClipboard text={accountN}>*/}
          <CopyToClipboard text={'accountN'}>
            <img className={styles.copy} src={copySrc} alt="copy" />
          </CopyToClipboard>
        </div>

        <div className={styles.wrapperItem}>
          <div className={styles.titleItem}>SWIFT</div>
          {/*<div className={styles.value}>{swift}</div>*/}
          <div className={styles.value}>{'swift'}</div>

          {/*<CopyToClipboard text={swift}>*/}
          <CopyToClipboard text={'swift'}>
            <img className={styles.copy} src={copySrc} alt="copy" />
          </CopyToClipboard>
        </div>

        <div className={styles.wrapperItem}>
          <div className={styles.titleItem}>Reference</div>
          <div className={styles.value}>{'reference'}</div>
          {/*<div className={styles.value}>{reference}</div>*/}

          {/*<CopyToClipboard text={reference}>*/}
          <CopyToClipboard text={'reference'}>
            <img className={styles.copy} src={copySrc} alt="copy" />
          </CopyToClipboard>
        </div>

        <div className={styles.wrapperButton}>
          <Button
            blue
            value="Payment done"
            handleAction={handlePaymentMethod}
            // disabled={!allow}
            disabledReason={'Should input your first and last names'}
          />
          {/*{!allow && <p style={{marginTop: 10}}>Go to <Link to={book.settings}> settings </Link> to input necessary fields</p>}*/}
          {!false && <p style={{marginTop: 10}}>Go to <Link to={book.settings}> settings </Link> to input necessary fields</p>}
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



    // <TopupBankView
    //   bank={bank}
    //   getValue={getValue}
    //   handlePaymentMethod={handlePaymentMethod}
    //   allow={allowPayment}
    //   currentCurrency={currentCurrency}
    //   totalAmount={totalAmount}
    // />
  );
};

const mapStateToProps = state => ({
  // bank: bankInfo(state),
  bank: state.topup.dataMethods[0],
  getValue: state.topup.topupParams.get,
  spendValue: state.topup.topupParams.spend,
  getCurrency: state.topup.topupParams.currency,
  allowPayment: state.profile.user.firstName && state.profile.user.lastName,
  currentCurrency: state.profile.user.currency,
  totalAmount: state.topup.topupParams.total
});

const mapDispatchToProps = {
  topupPaymentAsync: topupActions.topupPaymentAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopupBank);
