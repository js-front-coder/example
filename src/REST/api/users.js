import { MAIN_URL } from '../config';

export default class Users {
  static get token() {
    return localStorage.getItem('token');
  }

  searchForNumbers() {
    return fetch(`${MAIN_URL}/v1/client/send/history`, {
      method: 'GET',
      headers: {
        'x-access-token': Users.token
      }
    });
  }
}
