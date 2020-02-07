import { MAIN_URL } from '../config';

export default class Activity {
  static get token() {
    return localStorage.getItem('token');
  }

  activity(type) {
    return fetch(`${MAIN_URL}/v1/client/activities?type=${type}`, {
      method: 'GET',
      headers: {
        'x-access-token': Activity.token
      }
    });
  }
}
