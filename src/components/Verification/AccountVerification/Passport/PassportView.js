// Core
import React from "react";

import { Button } from "components/Common";

import iconUpload from "theme/images/Verification/AccountVerification/Selfie/upload.svg";
import passportFrontSrc from "theme/images/Verification/AccountVerification/Passport/passport-front.png";
import passportBackSrc from "theme/images/Verification/AccountVerification/Passport/passport-back.png";

import iconCheck from "theme/images/Verification/AccountVerification/Selfie/check-green.svg";
import iconCancel from "theme/images/Verification/AccountVerification/Selfie/cancel.svg";

import styles from "./Passport.module.scss";

export const PassportView = ({
  onSumbit,
  passportFront,
  passportBack,
  resetImageFront,
  resetImageBack,
  handleChangeImageFront,
  handleChangeImageBack,
  handleBack
}) => (
  <>
    <div className={styles.wrapperPassword}>
      <>
        {passportFront ? (
          <div className={styles.uploadedContainerFront}>
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
                onClick={resetImageFront}
              >
                <img src={iconCancel} alt="iconCancel" />
              </button>
            </div>
            <div className={styles.uploadedBoxImg}>
              <img
                src={passportFrontSrc}
                alt="passportFront"
                className={styles.uploadedTemplateImage}
              />
            </div>
          </div>
        ) : (
          <div className={styles.addPhotoContainerFront}>
            <label htmlFor="pictureFileFront">
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
                id="pictureFileFront"
                className={styles.pictureInput}
                onChange={handleChangeImageFront}
              />
            </label>
            <div className={styles.imageTypes}>
              <img src={passportFrontSrc} alt="passwordFront" />
            </div>
          </div>
        )}
      </>

      <>
        {passportBack ? (
          <div className={styles.uploadedContainerBack}>
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
                onClick={resetImageBack}
              >
                <img src={iconCancel} alt="iconCancel" />
              </button>
            </div>
            <div className={styles.uploadedBoxImg}>
              <img
                src={passportBackSrc}
                alt="passportBack"
                className={styles.uploadedTemplateImage}
              />
            </div>
          </div>
        ) : (
          <div className={styles.addPhotoContainerBack}>
            <label htmlFor="pictureFileBack">
              <div className={styles.labelInner}>
                <div className={styles.labelImage}>
                  <img src={iconUpload} alt="iconUpload" />
                </div>
                <div className={styles.labelText}>
                  <p className={styles.addText}>Add back side</p>
                  <p className={styles.uploadText}>Upload or take a picture</p>
                </div>
              </div>
              <input
                type="file"
                id="pictureFileBack"
                className={styles.pictureInput}
                onChange={handleChangeImageBack}
              />
            </label>
            <div className={styles.imageTypes}>
              <img src={passportBackSrc} alt="passportBack" />
            </div>
          </div>
        )}
      </>
      <button className={styles.prevButton} onClick={handleBack} />
    </div>
    <div className={styles.submitBtn}>
      <Button blue value="Submit" handleAction={onSumbit} />
    </div>
  </>
);
