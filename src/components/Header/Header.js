// Core
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import {authActions} from "bus/auth/actions";
import {selectorBalance} from "bus/profile/selectors";

import {HeaderView} from "./HeaderView";

const Header = (
  {
    logoutAsync,
    balances = {},
    isVerified = true,
    authenticateAsync,
    currentCountry,
    profilePhone
  }) => {
  const handleCompleteKyc = () => {
    authenticateAsync();
  };

  const [smallKyc, setSmallKyc] = useState(false);

  const handleMobileKyc = () => {
    if (window.innerWidth <= 576) {
      setSmallKyc(true);
    } else {
      setSmallKyc(false);
    }
  };

  useEffect(() => {
    handleMobileKyc();
    window.addEventListener("resize", handleMobileKyc);
    return () => window.removeEventListener("resize", handleMobileKyc);
  }, [smallKyc]);


  return (
    <HeaderView
      balances={balances}
      isVerified={isVerified}
      logoutAsync={logoutAsync}
      handleCompleteKyc={handleCompleteKyc}
      smallKyc={smallKyc}
      currentCountry={currentCountry}
      profilePhone={profilePhone}
    />
  );
};

const mapStateToProps = state => ({
  isVerified: state.profile.user.isVerified,
  balances: state.profile.user.balances,
  profilePhone: state.profile.user.phone,
  currentCountry: state.profile.user.country
});

const mapDispatchToProps = {
  logoutAsync: authActions.logoutAsync,
  authenticateAsync: authActions.authenticateAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
