import { MAIN_URL } from '../config';

export default class Profile {
  static get token() {
    return localStorage.getItem('token');
  }
  getBalances() {
    return fetch(`${MAIN_URL}/v1/client/getbalances`, {
      method: 'GET',
      headers: {
        'x-access-token': Profile.token
      }
    });
  }

  uploadAvatar(data) {
    return fetch(`${MAIN_URL}/v1/client/upload/photo`, {
      method: 'POST',
      headers: {
        'x-access-token': Profile.token,
        'Accept': '/',
      },
      body: data.data
    });
  }

  updateProfile(data) {
    return fetch(`${MAIN_URL}/v1/client/update`, {
      method: 'POST',
      headers: {
        'x-access-token': Profile.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  verifyPhone(phone) {
    return fetch(`${MAIN_URL}/v1/client/verifyphone`, {
      method: 'POST',
      headers: {
        'x-access-token': Profile.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phone)
    });
  }

  changeNumber(code) {
    return fetch(`${MAIN_URL}/v1/client/changenumber`, {
      method: 'POST',
      headers: {
        'x-access-token': Profile.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(code)
    });
  }
}
