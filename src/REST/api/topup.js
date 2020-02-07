import { MAIN_URL } from '../config';

export default class Topup {
  static get token() {
    return localStorage.getItem('token');
  }

  exchange({spend, currencyFrom, currencyTo}) {
    return fetch(
      `${MAIN_URL}/v1/exchange?type=topup&from=${currencyFrom}&to=${currencyTo}&quantity=${spend}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': Topup.token
        }
      }
    );
  }
  methods() {
    return fetch(`${MAIN_URL}/v1/client/methods?type=topup`, {
      method: 'GET',
      headers: {
        'x-access-token': Topup.token
      }
    });
  }
  merchants(){
      return fetch(`${MAIN_URL}/v1/team/operations/merchant`, {
          method: 'GET',
          headers: {
              'x-access-token': Topup.token
          }
      });
  }
  payment(data) {
    return fetch(`${MAIN_URL}/v1/client/topup`, {
      method: 'POST',
      headers: {
        'x-access-token': Topup.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
