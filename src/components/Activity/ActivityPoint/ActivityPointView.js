// Core
import React from "react";
import moment from "moment";

import MoreInfoModal from "../MoreInfoModal/MoreInfoModal";
import ActivityPointSend from '../ActivityPointSend/ActivityPointSend';

import {beautifyDimoNumber, beautifyDimoTitle} from 'helper/beautifyDimo';

import redeemSrc from "theme/images/Activites/redeem.svg";
import sendSrc from "theme/images/Activites/send.svg";
import receivedSrc from "theme/images/Activites/received.svg";
import simpleTopup from "theme/images/Activites/simpleTopup.svg";
import topup from "theme/images/Activites/topup.svg";
import eyeSrc from "theme/images/Common/eye.svg";
import eyeActiveSrc from "theme/images/Common/eye-active.svg";
import closeActiveSrc from "theme/images/Activites/closeActive.svg";
import closeNoActiveSrc from "theme/images/Activites/closeNoActive.svg";

import styles from "./ActivityPoint.module.scss";
//todo: transfer this code to the main component
export const ActivityPointView = ({id, data, handleShowInfo}) => {

  return (
    <>
      {data.map(activity => {
        if (activity.type === "topup") {
          return (
            <div
              className={`${styles.wrapperPoint} ${styles.topup} activityPoint`}
              key={activity._id}
            >
              <div className={`${styles.wrapperIcon} ${styles.topupIcon}`}>
                <img src={topup} alt="topup"/>
              </div>
              <p className={styles.info}>
                <span className={styles.bold}>Top UP</span> request via{" "}
                <span className={styles.bold}>
                {activity.info.operationMethod}
              </span>{" "}
                {activity.info.getAmount}
                {activity.info.getCurrency === 'dTZS' ? ' TZS' : activity.info.getCurrency === 'dUGX' ? ' UGX' : 'Dimo'}  {/* here need only activity.info.getCurrency - ChangeCurrency */}
                {' for '}
                {activity.info.amount}{" "}
                {activity.info.currency}
              </p>
              <div className={styles.wrapperStatus}>
                {activity.info.status === "Pending" && (
                  <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
                )}

                {activity.info.status === "Cleared" && (
                  <span className={`${styles.status} ${styles.approved}`}>
                  Approved
                </span>
                )}

                {activity.info.status === "Declined" && (
                  <span className={`${styles.status} ${styles.canceled}`}>
                  Canceled
                </span>
                )}
              </div>
              <p className={styles.time}>
                {moment(activity.timestamp).format("MMMM Do")}
              </p>
              {activity.info.status === "Pending" ||
              activity.info.status === "Declined" ? (
                <p className={`${styles.balance} ${styles.emptyBalance}`}>----</p>
              ) : (
                <p className={`${styles.balance} ${styles.positiveBalance}`}>
                  + {activity.info.currency === 'DIMO' ?
                  `${beautifyDimoNumber(activity.info.amount)} ${beautifyDimoTitle(activity.info.amount)}` :
                  `${activity.info.amount} ${activity.info.currency}`}
                </p>
              )}

              <div className={styles.wrapperEye}>
                <img
                  src={id === activity._id ? eyeActiveSrc : eyeSrc}
                  alt="eye"
                  className={id === activity._id ? `${styles.eyeActive}` : `${styles.eye}`}
                  onClick={() => handleShowInfo(activity._id)}
                />

                {activity.info.status === "Cleared" ||
                activity.info.status === "Declined" ? (
                  <img
                    src={closeNoActiveSrc}
                    alt="close"
                    className={styles.close}
                  />
                ) : (
                  <img
                    src={closeActiveSrc}
                    alt="close"
                    className={styles.close}
                  />
                )}
              </div>
              {id === activity._id && (
                <MoreInfoModal
                  type="topup"
                  additional={activity.info.additional}
                />
              )}
            </div>
          );
        } else if (activity.type === "redeem") {
          return (
            <div
              className={`${styles.wrapperPoint} ${styles.redeem} ${'activityPoint'}`}
              key={activity._id}
            >
              <div className={`${styles.wrapperIcon} ${styles.redeemIcon}`}>
                <img src={redeemSrc} alt="redeemIcon"/>
              </div>
              <p className={styles.info}>
                You <span className={styles.bold}>Withdraw</span>{" "}
                {activity.info.getAmount} {activity.info.getCurrency} for{" "}
                {activity.info.amount}
                {activity.info.currency === 'dTZS' ? ' TZS' : activity.info.currency === 'dUGX' ? ' UGX' : 'Dimo'}   {/* here need only activity.info.currency - ChangeCurrency */}
              </p>
              <div className={styles.wrapperStatus}>
                {activity.info.status === "Pending" && (
                  <span className={`${styles.status} ${styles.pending}`}>
                  Pending
                </span>
                )}

                {activity.info.status === "Cleared" && (
                  <span className={`${styles.status} ${styles.approved}`}>
                  Approved
                </span>
                )}

                {activity.info.status === "Declined" && (
                  <span className={`${styles.status} ${styles.canceled}`}>
                  Canceled
                </span>
                )}
              </div>
              <p className={styles.time}>
                {" "}
                {moment(activity.timestamp).format("MMMM Do")}
              </p>{" "}
              {activity.info.status === "Declined" ? (
                <p className={`${styles.balance} ${styles.positiveBalance}`}>
                  + {activity.info.currency === 'DIMO' ?
                  `${beautifyDimoNumber(activity.info.amount)} ${beautifyDimoTitle(activity.info.amount)}` :
                  `${activity.info.amount} 
                  ${activity.info.currency === 'dTZS' ? 'TZS' : activity.info.currency === 'dUGX' ? 'UGX' : 'Dimo'}`}   {/* here need only activity.info.currency - ChangeCurrency */}
                </p>
              ) : (
                <p className={`${styles.balance} ${styles.negativeBalance}`}>
                  - {activity.info.currency === 'DIMO' ?
                  `${beautifyDimoNumber(activity.info.amount)} ${beautifyDimoTitle(activity.info.amount)}` :
                  `${activity.info.amount} 
                  ${activity.info.currency === 'dTZS' ? 'TZS' : activity.info.currency === 'dUGX' ? 'UGX' : 'Dimo'}`}   {/* here need only activity.info.currency - ChangeCurrency */}
                </p>
              )}
              <div className={styles.wrapperEye}>
                <img
                  src={id === activity._id ? eyeActiveSrc : eyeSrc}
                  alt="eye"
                  className={id === activity._id ? `${styles.eyeActive}` : `${styles.eye}`}
                  onClick={() => handleShowInfo(activity._id)}
                />
              </div>
              {id === activity._id && (
                <MoreInfoModal
                  type="redeem"
                  additional={activity.info.additional}
                />
              )}
            </div>
          );
        } else if (activity.type === "send") {
          return (
            <ActivityPointSend activity={activity} key={activity._id}/>
          );
        }
        return null;
      })}
    </>
  )
}



