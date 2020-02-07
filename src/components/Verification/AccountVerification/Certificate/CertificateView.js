// Core
import React from "react";

import { Button } from "components/Common";

import iconUpload from "theme/images/Verification/AccountVerification/Selfie/upload.svg";
import certificate from "theme/images/Verification/AccountVerification/Certificate/certificate.png";

import IconCheck from "theme/images/Verification/AccountVerification/Selfie/check-green.svg";
import IconCancel from "theme/images/Verification/AccountVerification/Selfie/cancel.svg";

import styles from "./Certificate.module.scss";

export const CertificateView = ({
  onSumbit,
  resetImage,
  certificatePhoto,
  handleChangeImage,
  handleBack,
  imageStatus
}) => (
  <>
    <div className={styles.wrapperCertificate}>
      {certificatePhoto ? (
        <div className={styles.uploadedContainer}>
          <div className={styles.uploadedHeader}>
            <div className={styles.uploadedUnit}>
              <div className={styles.uploadedCheck}>
                <img src={IconCheck} alt={IconCheck} />
              </div>
              <span className={styles.uploadedText}>Uploaded!</span>
            </div>
            <button
              type="button"
              className={styles.uploadedCancel}
              onClick={resetImage}
            >
              <img src={IconCancel} alt="IconCancel" />
            </button>
          </div>
          <div className={styles.uploadedBoxImg}>
            <img
              src={certificate}
              alt="certificate"
              className={styles.uploadedTemplateImage}
            />
          </div>
        </div>
      ) : (
        <div className={styles.addPhotoContainer}>
          <label htmlFor="pictureFile">
            <div className={styles.labelInner}>
              <div className={styles.labelImage}>
                <img src={iconUpload} alt="iconUpload" />
              </div>
              <div className={styles.labelText}>
                <p className={styles.addText}>Add front side</p>
                <p className={styles.uploadText}>Upload or take a picture</p>
              </div>
            </div>
            <input
              type="file"
              id="pictureFile"
              className={styles.pictureInput}
              onChange={handleChangeImage}
            />
          </label>
          <div className={styles.imageTypes}>
            <img src={certificate} alt="certificate" />
          </div>
        </div>
      )}
      <button className={styles.prevButton} onClick={handleBack} />
    </div>
    <div className={styles.submitBtn}>
      <Button blue value="Submit" handleAction={onSumbit} />
    </div>
    <div className={styles.submitBtn}>
      {imageStatus}
    </div>
  </>
);
