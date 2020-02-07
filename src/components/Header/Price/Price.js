// Core
import React, { useState, useEffect } from "react";

import { PriceView } from "./PriceView";

const Price = ({ balances, mobile, small, currentCountry, profilePhone }) => {
  const [statusModalCode, setStatusModalCode] = useState(false);

  const handleQRClick = flag => {
    setStatusModalCode(flag !== undefined ? flag : !statusModalCode);
  };

  const qrValue = profilePhone;

  const checkBalances = () => {

    if (currentCountry === 'TZ') {
      delete balances.dUGX;
    } else if (currentCountry === 'UG') {
      delete balances.dTZS;
    }

    return balances;
  };


  return (
    <PriceView
      balances={checkBalances()}
      mobile={mobile}
      handleQRClick={handleQRClick}
      qrValue={qrValue}
      statusModalCode={statusModalCode}
      small={small}
      profilePhone={profilePhone}
    />
  );
};

export default Price;
