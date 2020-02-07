export const book = Object.freeze({
  login: '/login',
  signup: '/signup',
  forgotPassword: '/login/forgot-password',
  resetPassword: '/reset-password',
  secondAuthentication: '/second-authentication',
  verification: {
    notification: '/verification/notification',
    passport: '/verification/passport',
    certificate: '/verification/certificate',
    licence: '/verification/licence',
    selfie: '/verification/selfie',
    status: '/verification/status'
  },
  wallets: {
    wallets: '/wallets',
    topupBank: '/wallets/bank',
  },
  send: '/send',
  chat: '/chat',
  topupRedeem: {
    topupRedeem: '/topup-redeem',
    topup: '/topup-redeem/topup',
    redeem: '/topup-redeem/redeem',
    topupBank: '/topup-redeem/topup/bank',
    redeemBank: '/topup-redeem/redeem/bank',
    topupCash: '/topup-redeem/topup/cash',
    redeemCash: '/topup-redeem/redeem/cash',
  },
  settings: '/settings',
  activity: {
    activity: '/activity',
    all: '/activity/all',
    send: '/activity/send',
    topup: '/activity/topup',
    redeem: '/activity/redeem'
  }
});
