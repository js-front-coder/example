// Core
import React, { useState, useEffect } from 'react';

import { WrapperSection, Container } from 'components/Common';
import { WalletsView } from './WalletsView';
import { book } from "../../navigation/book";
import { Switch, Route, Redirect } from 'react-router-dom';
import TopupBank from '../TopupBank/TopupBank';
import { connect } from "react-redux";

import { walletsActions } from 'bus/wallets/actions';
import { profileActions } from 'bus/profile/actions';

import { beautifyDimoNumber, beautifyDimoTitle } from 'helper/beautifyDimo';
// import styles from "src/components/Wallets/Wallets.module.scss";
import styles from './Wallets.module.scss';
// import addActiveSrc from "*.svg";
// import addSrc from "*.svg";
import addSrc from "theme/images/Wallets/add.svg";
import arrowSrc from "theme/images/Wallets/arrow.svg";
import chartSrc from "theme/images/Wallets/chart.svg";

import addActiveSrc from "theme/images/Wallets/add-active.svg";
import arrowActiveSrc from "theme/images/Wallets/arrow-active.svg";
import chartActiveSrc from "theme/images/Wallets/chart-active.svg";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import cx from "classnames";
// import { Transfer } from "src/components/Wallets/Transfer";
import Topup from '../Topup/Topup';

//todo: need refactor

const Wallets = (
  {
    topupValue,
    transferValue,
    setTransfer,
    walletsTransfer,
    asyncExchange,
    getBalances,
    balances,
    charts,
    getCharts,
    currentCountry,
    currentCurrency,
    availableCurrencies,
  }
) => {
  const [walletsActiveButton, setWalletsActiveButton] = useState('');
  const [activePanel, setActivePanel] = useState('');
  const [activeCurrency, setActiveCurrency] = useState('');

  const handleWalletButton = (type, e) => {
    setActivePanel(type);
    setActiveCurrency(e.currentTarget.name);
    setTransfer({ from: 'TZS', to: e.currentTarget.name, quantity: 0 });
  };

  const dimoTopUpButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dimoTopUp"
  });

  const wallets = Object.keys(availableCurrencies).map(key => {
    const currencyState = availableCurrencies[key].symbol;
    const currencyLabel = availableCurrencies[key].label;

    return (
      <div className={styles.wrapperWallet}>
        <div className={styles.titleWallet}>{currencyLabel} WALLET</div>
        <div className={styles.wrapperCount}>
          <div className={styles.count}>
            {/*{balances !== undefined && balances.DIMO !== undefined ? beautifyDimoNumber(balances.DIMO) : 0}*/}
            {balances[currencyState] || 0}
          </div>
          {/*<div className={styles.value}>{beautifyDimoTitle(balances.DIMO)}</div>*/}
          <div className={styles.value}>{currencyLabel}</div>
        </div>
        <div className={styles.wrapperButtons}>
          <button
            className={dimoTopUpButton}
            name={currencyState}
            onClick={(e) => handleWalletButton('topUp', e)}
          >
            {walletsActiveButton === "dimoTopUp" ? (
              <img src={addActiveSrc} alt="add"/>
            ) : (
              <img src={addSrc} alt="add"/>
            )}
          </button>

          <button
            // className={dimoTransferButton}
            onClick={() => handleWalletsButton("dimoTransfer")}
          >
            {walletsActiveButton === "dimoTransfer" ? (
              <img src={arrowActiveSrc} alt="arrow"/>
            ) : (
              <img src={arrowSrc} alt="arrow"/>
            )}
          </button>

          <button
            // className={dimoChartButton}
            onClick={() => {
              handleWalletsButton("dimoChart");
            }}
          >
            {walletsActiveButton === "dimoChart" ? (
              <img src={chartActiveSrc} alt="chart"/>
            ) : (
              <img src={chartSrc} alt="chart"/>
            )}
          </button>
        </div>
      </div>

    )
  });


  /////////////////////////////////////////////////////////////////////////////////

  const [statusTimeChart, setTimeChart] = useState({
    year: true,
    month: false,
    day: false,
    hour: false
  });

  // const [walletsActiveButton, setWalletsActiveButton] = useState('');
  const [selectCurrency, setSelectCurrency] = useState('Dimo');

  //todo: refactor this value
  const handleSelectTime = type => {
    if (type === 'year') {
      setTimeChart({ year: true, month: false, day: false, hour: false });
    } else if (type === 'month') {
      setTimeChart({ year: false, month: true, day: false, hour: false });
    } else if (type === 'day') {
      setTimeChart({ year: false, month: false, day: true, hour: false });
    } else if (type === 'hour') {
      setTimeChart({ year: false, month: false, day: false, hour: true });
    }
  };

  const handleChangeSpend = (value, from, to) => {
    setTransfer({ from: from, to: to, quantity: value });
  };

  const handleWalletsButton = async (type, e) => {
    // setActivePanel(type);
    // setActiveCurrency(e.currentTarget.name);

    await setWalletsActiveButton(type);

    await setTransfer({ from: type, to: selectCurrency, quantity: 0 });
  };

  const onExchangeHandler = (from, to) => {
    asyncExchange({ currency: from, getCurrency: to, amount: walletsTransfer.quantity });
  };

  const handleSelectCurrency = async data => {
    setSelectCurrency(data);
  };

  useEffect(() => {
    getBalances();
    getCharts('year');
  }, [walletsActiveButton]);

  const currency = 'DIMO';

  return (
    <WrapperSection>
      <Container>

        <Switch>
          <Route exact render={() => (
            <div className={styles.mainWrapper}>
              <div className={styles.wrapperWallets}>
                {wallets}
              </div>

              {/*{walletsActiveButton === "dimoChart" && (*/}
              {/*  <div className={styles.wrapperChart}>*/}
              {/*    <div className={styles.headerChart}>*/}
              {/*      <div className={styles.wrapperHeaderChart}>*/}
              {/*        <div className={styles.titleChart}>Dimo / USD</div>*/}
              {/*        <div className={styles.wrapperButtonsChart}>*/}
              {/*          <button*/}
              {/*            className={yearButton}*/}
              {/*            onClick={() => {*/}
              {/*              handleSelectTime("year");*/}
              {/*              getCharts('year');*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            year*/}
              {/*          </button>*/}
              {/*          <button*/}
              {/*            className={monthButton}*/}
              {/*            onClick={() => {*/}
              {/*              handleSelectTime("month");*/}
              {/*              getCharts('month');*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            month*/}
              {/*          </button>*/}
              {/*          <button*/}
              {/*            className={dayButton}*/}
              {/*            onClick={() => {*/}
              {/*              handleSelectTime("day");*/}
              {/*              getCharts('week');*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            week*/}
              {/*          </button>*/}
              {/*          <button*/}
              {/*            className={hourButton}*/}
              {/*            onClick={() => {*/}
              {/*              handleSelectTime("hour");*/}
              {/*              getCharts('3days');*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            3 days*/}
              {/*          </button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*      <div className={styles.innerChart}>*/}
              {/*        <LineChart*/}
              {/*          width={720}*/}
              {/*          height={200}*/}
              {/*          data={chartsData}*/}
              {/*          syncId="anyId"*/}
              {/*          margin={{*/}
              {/*            top: 10,*/}
              {/*            right: 0,*/}
              {/*            left: 30,*/}
              {/*            bottom: 0*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          <CartesianGrid strokeDasharray="3 3"/>*/}
              {/*          <XAxis dataKey="name"/>*/}

              {/*          <YAxis orientation="right" domain={[charts.minValue, 'auto']}/>*/}
              {/*          <Tooltip/>*/}
              {/*          <Line*/}
              {/*            type="monotone"*/}
              {/*            dataKey="price"*/}
              {/*            stroke="#8884d8"*/}
              {/*            fill="#8884d8"*/}
              {/*          />*/}
              {/*        </LineChart>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}

              {/*{walletsActiveButton === "dimoTransfer" && (*/}
              {/*  <Transfer*/}
              {/*    transferValue={transferValue}*/}
              {/*    handleChangeSpend={handleChangeSpend}*/}
              {/*    currencyFrom='DIMO'*/}
              {/*    currenciesTo={checkCurrency()}*/}
              {/*    handleExchangeButton={handleExchangeButton}*/}
              {/*  />*/}
              {/*)}*/}

              {/*{walletsActiveButton === "dTZSTransfer" && (*/}
              {/*  <Transfer*/}
              {/*    transferValue={transferValue}*/}
              {/*    handleChangeSpend={handleChangeSpend}*/}
              {/*    currencyFrom='dTZS'*/}
              {/*    currenciesTo='DIMO'*/}
              {/*    handleExchangeButton={handleExchangeButton}*/}
              {/*  />*/}
              {/*)}*/}

              {/*{walletsActiveButton === "dUGXTransfer" && (*/}
              {/*  <Transfer*/}
              {/*    transferValue={transferValue}*/}
              {/*    handleChangeSpend={handleChangeSpend}*/}
              {/*    currencyFrom='dUGX'*/}
              {/*    currenciesTo='DIMO'*/}
              {/*    handleExchangeButton={handleExchangeButton}*/}
              {/*  />*/}
              {/*)}*/}

              {activePanel === "topUp" && (
                <Topup
                  swapAllow={false}
                  to={activeCurrency}
                  bankAddr={book.wallets.topupBank}
                />
              )}

            </div>
          )}
                 path={book.wallets.wallets}
          />
          <Route exact render={() => (
            <TopupBank goto={book.wallets.wallets}/>)}
                 path={book.wallets.topupBank}
          />
        </Switch>

      </Container>
    </WrapperSection>
  );
};

const mapStateToProps = state => ({
  walletsTransfer: state.wallets.transfer,
  balances: state.profile.user.balances,
  charts: state.wallets.charts,
  currentCountry: state.profile.user.country,
  currentCurrency: state.profile.user.currency,
  availableCurrencies: state.currency.availableCurrencies,
});

const mapDispatchToProps = {
  setTransfer: walletsActions.setTransfer,
  asyncExchange: walletsActions.asyncExchange,
  getBalances: profileActions.getBalances,
  getCharts: walletsActions.getCharts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallets);
