import { put, apply } from 'redux-saga/effects';

import { api } from 'REST';
import { profileActions } from 'bus/profile/actions';

import { uiActions } from 'bus/ui/actions';
import { currencyActions } from 'bus/currency/actions';

export function* getBalances() {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.profile.getBalances);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    const beautifyBalances = data.reduce((item, { asset, balance }) => {
      item[asset] = balance;
      return item;
    }, {});

    const availableCurrencies = {};

    data.forEach(item => {
      const currencyName = item.asset;

      let actualLabel = '';

      switch (currencyName) {
        case 'dTZS':
          actualLabel = 'TZS';
          break;
        case 'dUGX':
          actualLabel = 'UGX';
          break;
        default:
          actualLabel = currencyName;
      }

      availableCurrencies[currencyName] = {
        symbol: currencyName,
        label: actualLabel,
      };
    });


    const activeCurrency = availableCurrencies[Object.keys(availableCurrencies)[1]];

    yield put(profileActions.getBalancesResultFinal(beautifyBalances));
    yield put(currencyActions.setAvailableCurrencies(availableCurrencies));
    yield put(currencyActions.setActiveCurrency(activeCurrency));
  } catch (error) {
    yield put(uiActions.emitError(error, 'Users search worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
