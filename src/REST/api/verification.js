import { MAIN_URL } from '../config';

export default class Verification {
  static get token() {
    return localStorage.getItem('token');
  }

  uploadPhoto(photo) {
    return fetch(`${MAIN_URL}/v1/client/upload/kyc`, {
      method: 'POST',
      headers: {
        'x-access-token': Verification.token,
        'Accept': '/',
      },
      body: photo.data
    });
  }
}
