import { MAIN_URL } from '../config';

export default class Auth {
  static get token() {
    return localStorage.getItem('token');
  }

  signup(credentials) {
    return fetch(`${MAIN_URL}/v1/client/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  }

  login(credentials) {
    return fetch(`${MAIN_URL}/v1/client/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  }

  authenticate() {
    return fetch(`${MAIN_URL}/v1/client/me`, {
      method: 'GET',
      headers: {
        'x-access-token': Auth.token
      }
    });
  }

  forgotPassword(email) {
    return fetch(`${MAIN_URL}/v1/client/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    });
  }

  resetPassword(data) {
    return fetch(`${MAIN_URL}/v1/client/createnewpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
