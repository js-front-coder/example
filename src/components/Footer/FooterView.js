// Core
import React from "react";

import styles from "./Footer.module.scss";

export const FooterView = () => (
  <div className={styles.footerWrapper}>
    <div className={styles.footerCopyright}> © 2019 Dimo AG.</div>
    <div className={styles.footerMenu}>
      <ul className={styles.footerMenuList}>
        <div className={styles.footerMenuListBox}>
          <a
            href="https://dimo.org/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerMenuLink}
          >
            Terms
          </a>
          <a
            href="https://dimo.org/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerMenuLink}
          >
            Privacy Policy
          </a>
        </div>
        <div className={styles.footerMenuListBox}>
          <a
            href="https://dimo.org/faq"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerMenuLink}
          >
            FAQ
          </a>
        </div>
      </ul>
    </div>

  </div>
);
