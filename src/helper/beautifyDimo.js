const beautifyDimoNumber = value => {
  if (value < 10) {
    return (+value*10e4).toFixed(4);
  } else {
    return (+value).toFixed(4)
  }
};

const beautifyDimoTitle = value => {
  if (value < 10) {
    return 'nDimo'
  } else {
    return 'Dimo'
  }
};

export  { beautifyDimoNumber, beautifyDimoTitle };

