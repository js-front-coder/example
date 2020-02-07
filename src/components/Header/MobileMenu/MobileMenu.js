// Core
import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { authActions } from "bus/auth/actions";
import { selectorBalance } from "bus/profile/selectors";
import { useOnClickOutside } from "hooks/useOnClickOutside";

import { MobileMenuView } from "./MobileMenuView";

const MobileMenu = ({ balances, logoutAsync, isVerified = true , profilePhone}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => setMobileMenuOpen(true);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  const ref = useRef();
  useOnClickOutside(ref, () => handleMobileMenuClose());

  useEffect(() => {
    if (!mobileMenuOpen) {
      handleMobileMenuClose();
    }
  }, [mobileMenuOpen]);

  return (
    <MobileMenuView
      balances={balances}
      logoutAsync={logoutAsync}
      mobileMenuOpen={mobileMenuOpen}
      handleMobileMenuOpen={handleMobileMenuOpen}
      handleMobileMenuClose={handleMobileMenuClose}
      myRef={ref}
      isVerified={isVerified}
      profilePhone={profilePhone}
    />
  );
};

const mapStateToProps = state => ({
  isVerified: state.profile.user.isVerified,
  balances: state.profile.user.balances,
  profilePhone: state.profile.user.phone
});

const mapDispatchToProps = {
  logoutAsync: authActions.logoutAsync,
  authenticateAsync: authActions.authenticateAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu);
