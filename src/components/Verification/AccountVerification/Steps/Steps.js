// Core
import React from "react";
import { withRouter } from "react-router";
import cx from "classnames";

import styles from "./Steps.module.scss";

const Steps = ({ match: { url } }) => {
  const firstStepActive = cx(styles.verificationStep, {
    [styles.verificationStepActive]: true
  });
  const secondStepActive = cx(styles.verificationStep, {
    [styles.verificationStepActive]:
      url === "/verification/selfie" || url === "/verification/status"
  });
  const thirdStepActive = cx(styles.verificationStep, {
    [styles.verificationStepActive]: url === "/verification/status"
  });

  return (
    <div className={styles.verificationStepsWrapper}>
      <div className={styles.verificationSteps}>
        <div className={firstStepActive}>
          <div className={styles.verificationStepWrap}>
            <div className={styles.verificationStepCircle}>
              1
              <div className={styles.verificationStepDivider} />
            </div>
            <p className={styles.verificationStepDescription}>
              Proof of identify
            </p>
          </div>
        </div>
        <div className={secondStepActive}>
          <div className={styles.verificationStepWrap}>
            <div className={styles.verificationStepCircle}>
              2
              <div className={styles.verificationStepDivider} />
            </div>
            <p className={styles.verificationStepDescription}>Selfie</p>
          </div>
        </div>
        <div className={thirdStepActive}>
          <div className={styles.verificationStepWrap}>
            <div className={styles.verificationStepCircle}>3</div>
            <p className={styles.verificationStepDescription}>Status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Steps);
