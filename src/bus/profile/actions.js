import { createActions } from 'redux-actions';

export const profileActions = createActions({
  //Sync
  CLEAR_PROFILE: void 0,
  OPEN_MODAL_AVATAR: void 0,
  CLOSE_MODAL_AVATAR: void 0,
  OPEN_MODAL_NUMBER: void 0,
  CLOSE_MODAL_NUMBER: void 0,
  OPEN_MODAL_SMS: void 0,
  CLOSE_MODAL_SMS: void 0,
  FILL_PROFILE: userData => userData,
  FILL_AVATAR: avatar => avatar,
  FILL_NUMBER: number => number,
  SET_BALANCES: balances => balances,
  GET_BALANCES: void 0,
  GET_BALANCES_RESULT_FINAL: balances => balances,
  UPDATE_PROFILE_SUCCESS: void 0,
  CLEAR_PROP: (key, value) => {return{key, value}},

  //ASYNC
  UPLOAD_AVATAR_ASYNC: avatar => avatar,
  UPDATE_PROFILE_ASYNC: data => data,
  VERIFY_PHONE_ASYNC: phone => phone,
  CHANGE_NUMBER_ASYNC: code => code
});
