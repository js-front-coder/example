// Core
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { book } from "navigation/book";
import SVG from "react-inlinesvg";

import MobileMenu from "./MobileMenu/MobileMenu";
import Price from "./Price/Price";
import logo from "theme/images/Header/logo-dimo.svg";
import exit from "theme/images/Header/exit.svg";
import wallet from "theme/images/Header/wallets.svg";
import send from "theme/images/Header/send.svg";
import activity from "theme/images/Header/activity.svg";
import pup from "theme/images/Header/topup.svg";
import settings from "theme/images/Header/settings.svg";
import chat from "theme/images/Header/chat.svg";

import styles from "./Header.module.scss";

export const HeaderView = ({
  balances,
  logoutAsync,
  isVerified,
  handleCompleteKyc,
  smallKyc,
  currentCountry,
  profilePhone
}) => {
  return (
    <header className={styles.wrapperHeader}>
      <div className={styles.headerLeftSide}>
        <Link to={book.wallets.wallets} className={styles.wrapperLogo}>
          <img src={logo} alt="logo" />
        </Link>

        {!isVerified && (
          <button
            onClick={handleCompleteKyc}
            className={styles.statusCompleteButton}
          >
            {!smallKyc ? "Complete KYC" : "KYC"}
          </button>
        )}
      </div>

      <div className={styles.rightBlock}>
        <nav className={styles.blockLinks}>
          <NavLink
            to={book.wallets.wallets}
            className={`${styles.itemLink} ${styles.wallets}`}
            activeClassName={`${styles.activeLink} ${styles.wallets}`}
          >
            <SVG src={wallet} alt="wallet" />
            <span>Wallets</span>
          </NavLink>

          <NavLink
            to={book.send}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
          >
            <SVG src={send} alt="send" />
            <span>Send</span>
          </NavLink>

          <NavLink
              to={book.chat}
              className={`${styles.itemLink} ${styles.chat}`}
              activeClassName={`${styles.activeLink} ${styles.chat}`}
          >
            <SVG src={chat} alt="chat" />
            <span>Chat</span>
          </NavLink>

          <NavLink
            to={book.activity.activity}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
          >
            <SVG src={activity} alt="activity" />
            <span>Activity</span>
          </NavLink>

          <NavLink
            to={book.topupRedeem.topupRedeem}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
          >
            <SVG src={pup} alt="pup" />
            <span>Topup & Withdraw</span>
          </NavLink>

          <NavLink
            to={book.settings}
            className={styles.itemLink}
            activeClassName={styles.activeLink}
          >
            <SVG src={settings} alt="settings" />
            <span>Settings</span>
            {!isVerified && <i className={styles.settingsNotification} />}
          </NavLink>
        </nav>
        <Price
          balances={balances}
          currentCountry={currentCountry}
          profilePhone={profilePhone}
        />
        <MobileMenu />
        <div className={styles.wrapperLogout} onClick={logoutAsync}>
          <img src={exit} className={styles.logoutImg} alt="exit" />
        </div>
      </div>
    </header>
  );
};
