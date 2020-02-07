// Core
import React from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

export const Button = ({ value, blue, red, handleAction, small, disabled, disabledReason = '' }) => {
  const buttonStyle = cx(styles.button, {
    [styles.blue]: blue,
    [styles.red]: red
  });
  return (
    <button className={buttonStyle} onClick={handleAction} disabled={disabled} title={disabledReason}>
      {value}
    </button>
  );
};
