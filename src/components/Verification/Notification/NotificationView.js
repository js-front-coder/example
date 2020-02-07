// Core
import React from "react";
import cx from "classnames";

import { Button } from "components/Common";

import styles from "./Notification.module.scss";

export const NotificationView = ({ handleContinue, handleSkipKYC }) => {
  const stepMobileActive = cx(styles.notificationStep, {
    [`${styles.notificationStepMobileActive} ${styles.notificationStepActive}`]: true
  });
  const stepManActive = cx(styles.notificationStep, {
    [`${styles.notificationStepManActive} ${styles.notificationStepActive}`]: false
  });
  const stepFingerprintActive = cx(styles.notificationStep, {
    [`
      ${styles.notificationStepFingerprintActive}
      ${styles.notificationStepActive}
    `]: false
  });
  const stepCheckActive = cx(styles.notificationStep, {
    [`
      ${styles.notificationStepCheckActive}
      ${styles.notificationStepActive}
    `]: false
  });

  return (
    <div className={styles.notificationStepsWrapper}>
      <h3 className={styles.notificationStepsTitle}>Hey Buddy!</h3>
      <p className={styles.notificationStepsText}>
        By verifying the following items, you’ll unlock unlimited functions.
      </p>
      <div className={styles.notificationSteps}>
        <div className={stepMobileActive}>
          <div className={styles.notificationStepWrap}>
            <div className={styles.notificationStepCircle}>
              <div
                className={`${styles.notificationStepCircleImage} ${styles.notificationStepCircleMobile}`}
              />
              <div className={styles.notificationStepDivider} />
            </div>
            <p className={styles.notificationStepDescription}>Mobile Number</p>
          </div>
        </div>
        <div className={stepManActive}>
          <div className={styles.notificationStepWrap}>
            <div className={styles.notificationStepCircle}>
              <div
                className={`${styles.notificationStepCircleImage} ${styles.notificationStepCircleMan}`}
              />
              <div className={styles.notificationStepDivider} />
            </div>
            <p className={styles.notificationStepDescription}>Profile</p>
          </div>
        </div>
        <div className={stepFingerprintActive}>
          <div className={styles.notificationStepWrap}>
            <div className={styles.notificationStepCircle}>
              <div
                className={`${styles.notificationStepCircleImage} ${styles.notificationStepCircleFingerprint}`}
              >
                <div className={styles.notificationStepDivider} />
              </div>
            </div>
            <p className={styles.notificationStepDescription}>KYC</p>
          </div>
        </div>
        <div className={stepCheckActive}>
          <div className={styles.notificationStepWrap}>
            <div className={styles.notificationStepCircle}>
              <div
                className={`${styles.notificationStepCircleImage} ${styles.notificationStepCircleCheck}`}
              />
            </div>
            <p className={styles.notificationStepDescription}>Top up</p>
          </div>
        </div>
      </div>
      <div className={styles.wrapperButtons}>
        <Button blue value="Skip" handleAction={handleSkipKYC} />
        <Button blue value="Continue" handleAction={handleContinue} />
      </div>
    </div>
  );
};
