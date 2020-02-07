import React from 'react';

import { Button } from 'components/Common';
import IconCheck from 'theme/images/Verification/AccountVerification/Status/check.svg';
import IconRejected from 'theme/images/Verification/AccountVerification/Status/rejected.svg';
import SuccessImage from 'theme/images/Verification/AccountVerification/Status/successImage.svg';

import styles from './Status.module.scss';

export const StatusView = ({ handleBack, kyc }) => {
  return (
    <>
      {kyc.status === 'Pending' && (
        <div className={styles.statusBlueTheme}>
          <div className={styles.statusUploadedBlueHeader}>
            <div className={styles.statusUploadedUnit}>
              <div className={styles.statusUploadedCheck}>
                <img src={IconCheck} alt={IconCheck} />
              </div>
              <span className={styles.statusUploadedText}>Well done!</span>
            </div>
          </div>
          <div className={styles.statusContent}>
            <div className={styles.statusContentImage}>
              <img src={SuccessImage} alt={SuccessImage} />
            </div>
            <div className={styles.statusInfo}>
              <p>Thank you for submitting your KYC form.</p>
              <p>
                Please keep in mind, it may take several days to verify your
                information.
              </p>
              <p>
                Once your form will be reviewed you will receive a notification
                informing you of your KYC status
              </p>
            </div>
          </div>
        </div>
      )}

      {kyc.status === 'Rejected' && (
        <div className={styles.wrapperReject}>
          <div className={styles.statusOrangeTheme}>
            <div className={styles.statusUploadedOrangeHeader}>
              <div className={styles.statusUploadedUnit}>
                <div className={styles.statusUploadedCheck}>
                  <img src={IconRejected} alt={IconRejected} />
                </div>
                <span className={styles.statusUploadedText}>Rejected!</span>
              </div>
            </div>
            <div className={styles.statusContent}>
              <ul className={styles.statusList}>
                {kyc.reason.colorPhoto && (
                  <li className={styles.statusListItem}>Color photograph</li>
                )}
                {kyc.reason.highResolution && (
                  <li className={styles.statusListItem}>
                    High resolution image
                  </li>
                )}
                {kyc.reason.nameVisible && (
                  <li className={styles.statusListItem}>
                    Your name and surname must be visible in the document
                  </li>
                )}
                {kyc.reason.entireDocument && (
                  <li className={styles.statusListItem}>
                    In the photo the entire document
                  </li>
                )}
                {kyc.reason.withoutPassport && (
                  <li className={styles.statusListItem}>
                    Photo without passport
                  </li>
                )}
                {kyc.reason.message && (
                  <div className={styles.message}>
                    Message: {kyc.reason.message}
                  </div>
                )}
              </ul>
            </div>

            <div className={styles.wrapperPrevButton}>
              <button className={styles.prevButton} onClick={handleBack} />
            </div>
          </div>
          <div className={styles.wrapperAgainButton}>
            <Button blue value="TRY AGAIN" handleAction={handleBack} />
          </div>
        </div>
      )}
    </>
  );
};
