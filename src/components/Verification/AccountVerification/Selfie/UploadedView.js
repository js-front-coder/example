import React from "react";

import IconCheck from "theme/images/Verification/AccountVerification/Selfie/check-green.svg";
import IconCancel from "theme/images/Verification/AccountVerification/Selfie/cancel.svg";
import TemplatePassport from "theme/images/Verification/AccountVerification/Selfie/templatePassport.png";

import styles from "./Selfie.module.scss";

export const UploadedView = ({ resetImage }) => (
  <div className={styles.selfieUploadedContainer}>
    <div className={styles.selfieUploadedHeader}>
      <div className={styles.selfieUploadedUnit}>
        <div className={styles.selfieUploadedCheck}>
          <img src={IconCheck} alt={IconCheck} />
        </div>
        <span className={styles.selfieUploadedText}>Uploaded!</span>
      </div>
      <button
        type="button"
        className={styles.selfieUploadedCancel}
        onClick={resetImage}
      >
        <img src={IconCancel} alt={IconCancel} />
      </button>
    </div>
    <div className={styles.uploadedBoxImg}>
      <img
        src={TemplatePassport}
        alt={TemplatePassport}
        className={styles.selfieUploadedTemplateImage}
      />
    </div>
  </div>
);
