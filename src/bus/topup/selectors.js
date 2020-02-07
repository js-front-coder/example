const dataBank = {
  info: { accountN: '', swift: '', bank: '', account: '' },
  reference: ''
};
export const bankInfo = state => state.topup.dataMethods[0] || dataBank;
