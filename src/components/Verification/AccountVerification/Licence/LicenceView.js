// Core
import React from "react";

import { Button } from "components/Common";

import iconUpload from "theme/images/Verification/AccountVerification/Selfie/upload.svg";
import iconCheck from "theme/images/Verification/AccountVerification/Selfie/check-green.svg";
import iconCancel from "theme/images/Verification/AccountVerification/Selfie/cancel.svg";
import licence from "theme/images/Verification/AccountVerification/Licence/licence.png";

import styles from "./Licence.module.scss";

export const LicenceView = ({
  onSumbit,
  resetImage,
  licencePhoto,
  handleChangeImage,
  handleBack
}) => (
  <>
    <div className={styles.wrapperLicence}>
      {licencePhoto ? (
        <div className={styles.uploadedContainer}>
          <div className={styles.uploadedHeader}>
            <div className={styles.uploadedUnit}>
              <div className={styles.uploadedCheck}>
                <img src={iconCheck} alt="iconCheck" />
              </div>
              <span className={styles.uploadedText}>Uploaded!</span>
            </div>
            <button
              type="button"
              className={styles.uploadedCancel}
              onClick={resetImage}
            >
              <img src={iconCancel} alt="iconCancel" />
            </button>
          </div>
          <div className={styles.uploadedBoxImg}>
            <img
              src={licence}
              alt="licence"
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
            <img src={licence} alt="licence" />
          </div>
        </div>
      )}
      <button className={styles.prevButton} onClick={handleBack} />
    </div>
    <div className={styles.submitBtn}>
      <Button blue value="Submit" handleAction={onSumbit} />
    </div>
  </>
);
