// Core
import React, { useState, useEffect } from 'react';

import { SecondAuthenticationView } from './SecondAuthenticationView';

const SecondAuthentication = () => {
  const [resend, resendChange] = useState(10);

  useEffect(() => {
    if (resend > 0) {
      const timeout = setTimeout(() => resendChange(resend - 1), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [resend]);

  const handleResend = () => {
    resendChange(10);
  };

  return (
    <SecondAuthenticationView resend={resend} handleResend={handleResend} />
  );
};

export default SecondAuthentication;
