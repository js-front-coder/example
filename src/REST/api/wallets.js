import { MAIN_URL } from '../config';

export default class Wallets {
    static get token() {
        return localStorage.getItem('token');
    }

    transfer(configs) {
        const {from, to, quantity} = configs;
        return fetch(
            `${MAIN_URL}/v1/exchange?from=${from}&to=${to}&quantity=${quantity}`,
            {
                method: 'GET',
                headers: {
                    'x-access-token': Wallets.token
                }
            }
        );
    }
    exchange(configs) {
        return fetch(
            `${MAIN_URL}/v1/client/transfer`,
            {
                method: 'post',
                headers: {
                  'x-access-token': Wallets.token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(configs)
            }
        );
    }
    charts(config) {
      return fetch(
        `${MAIN_URL}/v1/client/charts?range=${config}`,
        {
          method: 'get',
          headers: {
            'x-access-token': Wallets.token
          }
        }
      )
    }
}