const dataBank = {
  _id: '',
  country: '',
  name: '',
  operationType: '',
  reference: ''
};
export const bankInfo = state => state.redeem.dataMethods[0] || dataBank;
