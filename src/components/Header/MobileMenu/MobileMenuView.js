// Core
import React from "react";

import Price from "../Price/Price";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { book } from "navigation/book";

import wallet from "theme/images/Header/wallets.svg";
import send from "theme/images/Header/send.svg";
import activity from "theme/images/Header/activity.svg";
import pup from "theme/images/Header/topup.svg";
import settings from "theme/images/Header/settings.svg";
import exit from "theme/images/Header/exit.svg";
import chat from "theme/images/Header/chat.svg";

import styles from "./MobileMenu.module.scss";

export const MobileMenuView = ({
  balances,
  logoutAsync,
  mobileMenuOpen,
  handleMobileMenuOpen,
  handleMobileMenuClose,
  myRef,
  isVerified,
  profilePhone
}) => {
  return (
    <>
      <div className={styles.burgerWrapper}>
        <button
          onClick={handleMobileMenuOpen}
          type="button"
          className={styles.burgerBtn}
        >
          <span className={styles.burgerBox}>
            <span className={styles.burgerBoxElem} />
            <span className={styles.burgerBoxElem} />
            <span className={styles.burgerBoxElem} />
          </span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className={styles.menuOverlay}>
          <div className={styles.menu} ref={myRef}>
            <Price balances={balances} small profilePhone={profilePhone} />
            <nav className={styles.blockLinks}>
              <NavLink
                to={book.wallets.wallets}
                className={styles.itemLink}
                onClick={handleMobileMenuClose}
                activeClassName={styles.activeLink}
              >
                <SVG src={wallet} alt="wallet" />
                <span>Wallets</span>
              </NavLink>

              <NavLink
                to={book.send}
                className={styles.itemLink}
                onClick={handleMobileMenuClose}
                activeClassName={styles.activeLink}
              >
                <SVG src={send} alt="send" />
                <span>Send</span>
              </NavLink>

              <NavLink
                  to={book.chat}
                  onClick={handleMobileMenuClose}
                  className={`${styles.itemLink} ${styles.chat}`}
                  activeClassName={`${styles.activeLink} ${styles.chat}`}
              >
                <SVG src={chat} alt="chat" />
                <span>Chat</span>
              </NavLink>

              <NavLink
                to={book.activity.activity}
                className={styles.itemLink}
                onClick={handleMobileMenuClose}
                activeClassName={styles.activeLink}
              >
                <SVG src={activity} alt="activity" />
                <span>Activity</span>
              </NavLink>

              <NavLink
                to={book.topupRedeem.topupRedeem}
                className={styles.itemLink}
                onClick={handleMobileMenuClose}
                activeClassName={styles.activeLink}
              >
                <SVG src={pup} alt="pup" />
                <span>Topup & Withdraw</span>
              </NavLink>

              <NavLink
                onClick={handleMobileMenuClose}
                to={book.settings}
                className={styles.itemLink}
                activeClassName={styles.activeLink}
              >
                <SVG src={settings} alt="settings" />
                <span>Settings</span>
                {!isVerified && <i className={styles.settingsNotification} />}
              </NavLink>
            </nav>
            <div className={styles.wrapperLogout} onClick={logoutAsync}>
              <img src={exit} className={styles.logoutImg} alt="exit" />
              <span>Log out</span>
            </div>
          </div>
          <button
            onClick={handleMobileMenuClose}
            type="button"
            className={styles.closeBtn}
          />
        </div>
      )}
    </>
  );
};
