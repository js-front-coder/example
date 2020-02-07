import { createSelector } from 'reselect';

export const getUser = state => state.profile.user;
export const getUserForm = state => {
  return {
    firstName: state.profile.user.firstName,
    lastName: state.profile.user.lastName,
    email: state.profile.user.email,
    phone: state.profile.user.phone,
    сountry: state.profile.user.сountry,
    address: state.profile.user.address,
    username: state.profile.user.username,
  }
};

const getProfileFromUser = createSelector(
  [getUser, getUserForm],
  (user, userForm) => {

  }
);

const balance = {
  DIMO: 0.0
};

export const selectorBalance = state => {
  if (state.profile.user.balances && state.profile.user.balances.DIMO > 0) {
    return state.profile.user.balances.DIMO;
  }
  return balance.DIMO;
};
