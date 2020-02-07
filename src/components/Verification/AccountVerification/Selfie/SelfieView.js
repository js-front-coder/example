// Core
import React from 'react';

import { Button } from 'components/Common';
import { AddPhotoView } from './AddPhotoView';
import { UploadedView } from './UploadedView';

import SelfiePicture from 'theme/images/Verification/AccountVerification/Selfie/personSelfie.png';

import styles from './Selfie.module.scss';

export const SelfieView = ({
  onSumbit,
  handleBack,
  resetImage,
  selfiePhoto,
  handleUploadSelfie
}) => {
  return (
    <div className={styles.wrapperSecondStep}>
      <div className={styles.selfieViewWrapper}>
        <h1 className={styles.selfieTitle}>Identity</h1>
        <div className={styles.selfieTopContainer}>
          <div className={styles.selfieDescription}>
            <p className={styles.selfieText}>
              Please upload a photo with your passport in your hands
            </p>
            <ul className={styles.selfieList}>
              <li className={styles.selfieListItem}>Color photograph</li>
              <li className={styles.selfieListItem}>High resolution image</li>
              <li className={styles.selfieListItem}>
                Your name and surname must be visible in the document
              </li>
              <li className={styles.selfieListItem}>
                In the photo the entire document
              </li>
            </ul>
          </div>
          <div className={styles.selfieImageWrapper}>
            <img src={SelfiePicture} alt={SelfiePicture} />
          </div>
        </div>
        {selfiePhoto ? (
          <UploadedView resetImage={resetImage} />
        ) : (
          <AddPhotoView handleUploadSelfie={handleUploadSelfie} />
        )}
        <div className={styles.selfieSubmitBtn}>
          <Button blue value="Submit" handleAction={onSumbit} />
        </div>
      </div>
      <div className={styles.wrapperPrevButton}>
        <button className={styles.prevButton} onClick={handleBack} />
      </div>
    </div>
  );
};
