import { MAIN_URL } from '../config';

export default class Send {
  static get token() {
    return localStorage.getItem('token');
  }

  send(data) {
    return fetch(`${MAIN_URL}/v1/client/send`, {
      method: 'POST',
      headers: {
        'x-access-token': Send.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

    history() {
        return fetch(`${MAIN_URL}/v1/client/send/history`, {
            method: 'GET',
            headers: {
                'x-access-token': Send.token,
                'Content-Type': 'application/json'
            },
        });
    }
  
  checkWallet(data) {
    return fetch(`${MAIN_URL}/v1/client/checkwallet`, {
      method: 'POST',
      headers: {
        'x-access-token': Send.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({search: data})
    })
      .then(response => response.json())
  }
}
