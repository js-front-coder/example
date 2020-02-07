export const selectorTopUp = state =>
  state.activity.data.filter(point => point.type === 'topup');

export const selectorSend = state =>
  state.activity.data.filter(point => point.type === 'send');

export const selectorRedeem = state =>
  state.activity.data.filter(point => point.type === 'redeem');
