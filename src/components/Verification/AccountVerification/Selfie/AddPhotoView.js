// Core

import React from 'react';

import IconUpload from 'theme/images/Verification/AccountVerification/Selfie/upload.svg';

import styles from './Selfie.module.scss';

export const AddPhotoView = ({ handleUploadSelfie }) => (
  <div className={styles.selfieAddPhotoContainer}>
    <label htmlFor='pictureFile'>
      <div className={styles.selfieLabelInner}>
        <div className={styles.selfieLabelImage}>
          <img src={IconUpload} alt={IconUpload} />
        </div>
        <div className={styles.selfieLabelText}>
          <p className={styles.selfieAddText}>Add Photo</p>
          <p className={styles.selfieUploadText}>Upload or take a picture</p>
        </div>
      </div>
      <input
        type='file'
        id='pictureFile'
        accept=".pdf,.jpg,.jpeg,.png"
        className={styles.selfiePictureInput}
        onChange={handleUploadSelfie}
      />
    </label>
    <p className={styles.selfieImageTypes}>PDF, JPG, JPEG, GIF or PNG</p>
  </div>
);
