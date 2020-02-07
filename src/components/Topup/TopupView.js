// Core
import React from "react";
import cx from "classnames";
import SVG from "react-inlinesvg";

import {Button} from "components/Common";
import reverse from "theme/images/TopupRedeem/Topup/reverse.svg";
import bank from "theme/images/TopupRedeem/Topup/bank.svg";
import card from "theme/images/TopupRedeem/Topup/credit-card.svg";
import cashImg from "theme/images/TopupRedeem/Topup/cash.svg";

import styles from './Topup.module.scss';

//todo: transfer this code to the main component
export class TopupView extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    // componentDidMount() {
    //     const _script = document.createElement("script");
    //
    //     _script.src = "https://www.wecashup.com/library/MobileMoney.js";
    //     _script.async = true;
    //     _script.classList.add('wecashup_button');
    //     _script.setAttribute(['data-demo'], true);
    //     _script.setAttribute(['data-sender-lang'], "en");
    //     _script.setAttribute(['data-sender-phonenumber'], "+237671234567");
    //     _script.setAttribute(['data-receiver-uid'], "x9UvYihmdjfnIAHD7zVKhD92Z573");
    //     _script.setAttribute(['data-receiver-public-key'], "pk_test_DrS8mpi2dgU1iFVS");
    //     _script.setAttribute(['data-transaction-parent-uid'], "");
    //     _script.setAttribute(['data-transaction-receiver-total-amount'], "594422"); //
    //     _script.setAttribute(['data-transaction-receiver-reference'], "XVT2VBF");
    //     _script.setAttribute(['data-transaction-sender-reference'], "XVT2VBF");
    //     _script.setAttribute(['data-sender-firstname'], "Test");
    //     _script.setAttribute(['data-sender-lastname'], "Test");
    //     _script.setAttribute(['data-transaction-method'], "pull");
    //     _script.setAttribute(['data-image'], "https://storage.googleapis.com/wecashup/frontend/img/airfrance.png");
    //     _script.setAttribute(['data-name'], "DIMO");
    //     _script.setAttribute(['data-crypto'], "true");
    //     _script.setAttribute(['data-cash'], "true");
    //     _script.setAttribute(['data-telecom'], "true");
    //     _script.setAttribute(['data-m-wallet'], "true");
    //     _script.setAttribute(['data-split'], "true");
    //     _script.setAttribute(['configuration-id'], "3");
    //     _script.setAttribute(['data-marketplace-mode'], "false");
    //     _script.setAttribute(['data-product-1-name'], "DIMO");
    //     _script.setAttribute(['data-product-1-quantity'], "1");  //
    //     _script.setAttribute(['data-product-1-unit-price'], "594426"); //
    //     _script.setAttribute(['data-product-1-reference'], "XVT2VBF");
    //     _script.setAttribute(['data-product-1-category'], "Billeterie");
    //     _script.setAttribute(['data-product-1-description'], "France is in the Air");
    //
    //     this.ref.current.appendChild(_script);
    // }

    // componentWillUnmount() {
    //   this.props.resetStore();
    // }

  render() {

        const {
            topup: {getValue, dataMethods},
            spend,
            selectCurrency,
            handleTopup,
            isReceptOpen,
            handleExchange,
            handleBankButton,
            handleCardButton,
            handleChangeSpend,
            handleSelectCurrency,
            swapAllow,
            isWeCashUpOpen,
            handleCashButton,
            isActiveCard,
            isActiveBank,
            isActiveCash,
          currentCountry,
            physicalCurrency
        } = this.props;

        const getCurrencyDtzs = cx(styles.label, styles.currencyLabel, {
          [styles.activeLabel]: selectCurrency === 'dTZS'
        });

  const getCurrencyDimo = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'DIMO'
  });

  const getCurrencydUGX = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'dUGX'
  });


  return (
    <div className={styles.mainWrapper} ref={this.ref}>
      <div className={styles.mainInner}>
        <div className={styles.formWrapper}>
          <label className={styles.wrapperLabel}>
            <p className={styles.label}>Spend</p>
            <input
              value={spend}
              type="text"
              placeholder="0"
              className={cx(styles.field, styles.fieldActive)}
              onChange={handleChangeSpend}
            />

            <div className={styles.fieldCoin}>{physicalCurrency}</div>
          </label>
          <button className={styles.reverseButton} onClick={handleExchange}>
            <img src={reverse} alt={reverse} />
          </button>
          <label className={styles.wrapperLabel}>
            <div className={styles.wrapperGetInfo}>
              <p className={styles.label}>You get </p>
              {swapAllow ?
                  <div>
                      {currentCountry === 'TZ' &&
                      <span className={getCurrencyDtzs} onClick={() => handleSelectCurrency('dTZS')}>
                          TZS{' '}   {/* here need dTZS - ChangeCurrency */}
                      </span>
                      }
                      {/*<span*/}
                      {/*    className={getCurrencyDimo}*/}
                      {/*    onClick={() => handleSelectCurrency('DIMO')}*/}    {/* hiddenDimo */}
                      {/*>*/}
                      {/*    {' '}Dimo{' '}*/}
                      {/*</span>*/}
                  {currentCountry === 'UG' &&
                  <span className={getCurrencydUGX}
                    onClick={() => handleSelectCurrency('dUGX')}
                  >{` UGX `}   {/* here need dUGX - ChangeCurrency */}
                </span>}
                </div> : null}
            </div>


            <input
              readOnly
              type="number"
              placeholder="0"
              value={getValue.get}
              // value={selectCurrency}
              className={styles.field}
            />

            <div className={styles.fieldCoin}>{selectCurrency === 'dTZS' ? 'TZS' : selectCurrency === 'dUGX' ? 'UGX' : 'Dimo'}</div>  {/* here need only selectCurrency - ChangeCurrency */}
          </label>
        </div>
          <p className={styles.mainText}>Choose a topup method</p>
          <div className={styles.methodButtons}>
                        {dataMethods.map(
                            method =>
                                method.name === 'Bank' && (
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
                                [styles.cashButtonActive]: isActiveCash
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
                                        {getValue.spend} {physicalCurrency}
                                    </div>
                                </div>
                                <div className={styles.ticketInfoItem}>
                                    <div className={styles.ticketInfoItemLeft}>You get</div>
                                    <div className={styles.ticketInfoItemRight}>
                                        {getValue.get} {selectCurrency === 'dTZS' ? 'TZS' : selectCurrency === 'dUGX' ? 'UGX' : 'Dimo'}   {/* here need only selectCurrency - ChangeCurrency */}
                                    </div>
                                </div>
                                <div className={styles.ticketInfoItem}>
                                    <div className={styles.ticketInfoItemLeft}>Payment method</div>
                                    <div className={styles.ticketInfoItemRight}>Bank</div>
                                </div>
                                <div className={styles.ticketInfoItem}>
                                    <div className={styles.ticketInfoItemLeft}>Fees</div>
                                    <div className={styles.ticketInfoItemRight}>{getValue.fee}</div>
                                </div>
                                <div className={styles.ticketInfoItem}>
                                    <div className={styles.ticketInfoItemLeft}>VAT</div>
                                    <div className={styles.ticketInfoItemRight}>{getValue.vat}</div>
                                </div>
                            </div>
                            <div className={styles.ticketInfoTotal}>
                                <div className={styles.ticketInfoTotalLeft}>Total</div>
                                <div className={styles.ticketInfoTotalRight}>
                                    {getValue.total} {physicalCurrency}
                                </div>
                            </div>

                            <div className={styles.buttonWrapper}>
                                <Button blue value="Top up" handleAction={handleTopup}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
