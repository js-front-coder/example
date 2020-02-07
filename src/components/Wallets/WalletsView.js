// Core
import React, { useState, useEffect } from "react";
import cx from "classnames";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import addSrc from "theme/images/Wallets/add.svg";
import arrowSrc from "theme/images/Wallets/arrow.svg";
import chartSrc from "theme/images/Wallets/chart.svg";

import addActiveSrc from "theme/images/Wallets/add-active.svg";
import arrowActiveSrc from "theme/images/Wallets/arrow-active.svg";
import chartActiveSrc from "theme/images/Wallets/chart-active.svg";

import reverse from "theme/images/TopupRedeem/Topup/reverse.svg";

import "./Wallets.scss";
import styles from "./Wallets.module.scss";
import Topup from "../Topup/Topup";
import { Transfer } from './Panels/Transfer';
import { book } from "../../navigation/book";

//todo: remove this component

export const WalletsView = ({
                              statusTimeChart,
                              handleSelectTime,
                              walletsActiveButton,
                              handleWalletsButton,
                              handleChangeSpend,
                              setRedeemCurrency,
                              topupValue,
                              transferValue,
                              handleExchangeButton,
                              balances,
                              handleSelectCurrency,
                              selectCurrency,
                              beautifyDimoNumber,
                              beautifyDimoTitle,
                              charts,
                              getCharts,
                              currentCountry,
                              currentCurrency
                            }) => {
  const yearButton = cx(styles.buttonChart, styles.yearButton, {
    [styles.activeChartButton]: statusTimeChart.year
  });

  const monthButton = cx(styles.buttonChart, styles.monthButton, {
    [styles.activeChartButton]: statusTimeChart.month
  });

  const dayButton = cx(styles.buttonChart, styles.dayButton, {
    [styles.activeChartButton]: statusTimeChart.day
  });

  const hourButton = cx(styles.buttonChart, styles.hourButton, {
    [styles.activeChartButton]: statusTimeChart.hour
  });

  const dimoChartButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dimoChart"
  });

  const dimoTransferButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dimoTransfer"
  });

  const dTZSTransferButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dTZSTransfer"
  });

  const dimoTopUpButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dimoTopUp"
  });

  const dTZSTopUpButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dTZSTopUp"
  });

  const dUGXTransferButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dUGXTransfer"
  });

  const dUGXTopUpButton = cx(styles.button, {
    [styles.activeButton]: walletsActiveButton === "dUGXTopUp"
  });

  const getCurrencyDimo = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'Dimo'
  });

  const getCurrencydTZS = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'dTZS'
  });

  const getCurrencydUGX = cx(styles.label, styles.currencyLabel, {
    [styles.activeLabel]: selectCurrency === 'dUGX'
  });

  const [exchangeCurrencyGet, setExchangeCurrencyGet] = useState(selectCurrency);

  const result = [];

  const createChartsData = () => {
    if (charts) {
      charts.chart.map(chart => {
        for (const key of Object.keys(chart)) {
          result.push({
            name: key.toString(),
            price: chart[key].toFixed(1),
          });
        }
      });
      setChartsData(result);
    }
  };

  const [chartsData, setChartsData] = useState(result);
  let currenciesTo = '';

  const checkCurrency = () => {
    if (currentCountry === 'TZ') {
      currenciesTo = 'dTZS';
    } else if (currentCountry === 'UG') {
      currenciesTo = 'dUGX';
    }

    return currenciesTo;
  };

  useEffect(() => {
    createChartsData();
  }, [charts]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapperWallets}>
        {/*<div className={styles.wrapperWallet}>*/}
          {/*<div className={styles.titleWallet}>DIMO WALLET</div>*/}
          {/*<div className={styles.wrapperCount}>*/}
          {/*  <div className={styles.count}>*/}
          {/*    {balances !== undefined && balances.DIMO !== undefined*/}
          {/*      ? beautifyDimoNumber(balances.DIMO)*/}
          {/*      : 0}*/}
          {/*  </div>*/}
          {/*  <div className={styles.value}>{beautifyDimoTitle(balances.DIMO)}</div>*/}
          {/*</div>*/}
          {/*<div className={styles.wrapperButtons}>*/}
            {/*<button*/}
            {/*  className={dimoTopUpButton}*/}
            {/*  onClick={() => handleWalletsButton("dimoTopUp")}*/}
            {/*>*/}
            {/*  {walletsActiveButton === "dimoTopUp" ? (*/}
            {/*    <img src={addActiveSrc} alt="add"/>*/}
            {/*  ) : (*/}
            {/*    <img src={addSrc} alt="add"/>*/}
            {/*  )}*/}
            {/*</button>*/}

            {/*<button*/}
            {/*  className={dimoTransferButton}*/}
            {/*  onClick={() => handleWalletsButton("dimoTransfer")}*/}
            {/*>*/}
            {/*  {walletsActiveButton === "dimoTransfer" ? (*/}
            {/*    <img src={arrowActiveSrc} alt="arrow" />*/}
            {/*  ) : (*/}
            {/*    <img src={arrowSrc} alt="arrow" />*/}
            {/*  )}*/}
            {/*</button>*/}

            {/*<button*/}
            {/*  className={dimoChartButton}*/}
            {/*  onClick={() => {*/}
            {/*    handleWalletsButton("dimoChart");*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {walletsActiveButton === "dimoChart" ? (*/}
            {/*    <img src={chartActiveSrc} alt="chart"/>*/}
            {/*  ) : (*/}
            {/*    <img src={chartSrc} alt="chart"/>*/}
            {/*  )}*/}
            {/*</button>*/}
          {/*</div>*/}
        {/*</div>*/}

        {currentCountry === "TZ" &&
        <div className={styles.wrapperWallet}>
          <div className={styles.titleWallet}>TZS WALLET</div>
          {/* ChangeCurrency */}
          <div className={styles.wrapperCount}>
            <div className={styles.count}>
              {balances !== undefined && balances.dTZS !== undefined ? (+balances.dTZS).toFixed(4) : 0}
            </div>
            <div className={styles.value}>TZS</div>
            {/* ChangeCurrency */}
          </div>
          <div className={styles.wrapperButtons}>
            <button
              className={dTZSTopUpButton}
              onClick={() => handleWalletsButton("dTZSTopUp")}
            >
              {walletsActiveButton === "dTZSTopUp" ? (
                <img src={addActiveSrc} alt="add"/>
              ) : (
                <img src={addSrc} alt="add"/>
              )}
            </button>

            {/*<button*/}
            {/*  className={dTZSTransferButton}*/}
            {/*  onClick={() => {*/}
            {/*    setExchangeCurrencyGet('Dimo');*/}
            {/*    handleWalletsButton("dTZSTransfer")}*/}
            {/*  }*/}
            {/*>*/}
            {/*  {walletsActiveButton === "dTZSTransfer" ? (*/}
            {/*    <img src={arrowActiveSrc} alt="arrow" />*/}
            {/*  ) : (*/}
            {/*    <img src={arrowSrc} alt="arrow" />*/}
            {/*  )}*/}
            {/*</button>*/}
          </div>
        </div>}

        {currentCountry === "UG" &&
        <div className={styles.wrapperWallet}>
          <div className={styles.titleWallet}>UGX WALLET</div>
          {/* ChangeCurrency */}
          <div className={styles.wrapperCount}>
            <div className={styles.count}>
              {balances !== undefined && balances.dUGX !== undefined
                ? (+balances.dUGX).toFixed(4)
                : 0}
            </div>
            <div className={styles.value}>UGX</div>
            {/* ChangeCurrency */}
          </div>
          <div className={styles.wrapperButtons}>
            <button
              className={dUGXTopUpButton}
              onClick={() => handleWalletsButton("dUGXTopUp")}
            >
              {walletsActiveButton === "dUGXTopUp" ? (
                <img src={addActiveSrc} alt="add"/>
              ) : (
                <img src={addSrc} alt="add"/>
              )}
            </button>

            {/*<button*/}
            {/*  className={dUGXTransferButton}*/}
            {/*   onClick={() => handleWalletsButton("dUGXTransfer")}*/}
            {/*>*/}
            {/*  {walletsActiveButton === "dUGXTransfer" ? (*/}
            {/*    <img src={arrowActiveSrc} alt="arrow" />*/}
            {/*  ) : (*/}
            {/*    <img src={arrowSrc} alt="arrow" />*/}
            {/*  )}*/}
            {/*</button>*/}

          </div>
        </div>}
      </div>

      {walletsActiveButton === "dimoChart" && (
        <div className={styles.wrapperChart}>
          <div className={styles.headerChart}>
            <div className={styles.wrapperHeaderChart}>
              <div className={styles.titleChart}>Dimo / USD</div>
              <div className={styles.wrapperButtonsChart}>
                <button
                  className={yearButton}
                  onClick={() => {
                    handleSelectTime("year");
                    getCharts('year');
                  }}
                >
                  year
                </button>
                <button
                  className={monthButton}
                  onClick={() => {
                    handleSelectTime("month");
                    getCharts('month');
                  }}
                >
                  month
                </button>
                <button
                  className={dayButton}
                  onClick={() => {
                    handleSelectTime("day");
                    getCharts('week');
                  }}
                >
                  week
                </button>
                <button
                  className={hourButton}
                  onClick={() => {
                    handleSelectTime("hour");
                    getCharts('3days');
                  }}
                >
                  3 days
                </button>
              </div>
            </div>
            <div className={styles.innerChart}>
              <LineChart
                width={720}
                height={200}
                data={chartsData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 0,
                  left: 30,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>

                <YAxis orientation="right" domain={[charts.minValue, 'auto']}/>
                <Tooltip/>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </div>
          </div>
        </div>
      )}

      {walletsActiveButton === "dimoTransfer" && (
        <Transfer
          transferValue={transferValue}
          handleChangeSpend={handleChangeSpend}
          currencyFrom='DIMO'
          currenciesTo={checkCurrency()}
          handleExchangeButton={handleExchangeButton}
        />
      )}

      {walletsActiveButton === "dTZSTransfer" && (
        <Transfer
          transferValue={transferValue}
          handleChangeSpend={handleChangeSpend}
          currencyFrom='dTZS'
          currenciesTo='DIMO'
          handleExchangeButton={handleExchangeButton}
        />
      )}

      {walletsActiveButton === "dUGXTransfer" && (
        <Transfer
          transferValue={transferValue}
          handleChangeSpend={handleChangeSpend}
          currencyFrom='dUGX'
          currenciesTo='DIMO'
          handleExchangeButton={handleExchangeButton}
        />
      )}

      {walletsActiveButton === "dimoTopUp" && (
        <Topup
          swapAllow={false}
          to={"DIMO"}
          bankAddr={book.wallets.topupBank}
        />
      )}

      {walletsActiveButton === "dTZSTopUp" && (
        <Topup
          swapAllow={false}
          to={"dTZS"}
          bankAddr={book.wallets.topupBank}
        />
      )}

      {walletsActiveButton === "dUGXTopUp" && (
        <Topup
          swapAllow={false}
          to={"dUGX"}
          bankAddr={book.wallets.topupBank}
        />
      )}
    </div>
  );
};
