import { MAIN_URL } from '../config';

export default class Redeem {
  static get token() {
    return localStorage.getItem('token');
  }

  exchange(value = 0, from = 'DIMO', to = 'TZS') {
    return fetch(
      `${MAIN_URL}/v1/exchange?type=redeem&from=${from}&to=${to}&quantity=${value}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': Redeem.token
        }
      }
    );
  }

  methods() {
    return fetch(`${MAIN_URL}/v1/client/methods?type=redeem`, {
      method: 'GET',
      headers: {
        'x-access-token': Redeem.token
      }
    });
  }

  payment(data) {
    return fetch(`${MAIN_URL}/v1/client/redeem`, {
      method: 'POST',
      headers: {
        'x-access-token': Redeem.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
