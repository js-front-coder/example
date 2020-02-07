import React from 'react';
import moment from 'moment';

import styles from './ActivityPointSend.module.scss';

import sendSrc from "theme/images/Activites/send.svg";
import {beautifyDimoNumber, beautifyDimoTitle} from "../../../helper/beautifyDimo";

const ActivityPointSend = ({activity}) => {

  return (
    <div className={`${styles.wrapperPoint} ${styles.send} ${'activityPoint'}`}>
      <div className={`${styles.wrapperIcon} ${styles.sendIcon}`}>
        <img src={sendSrc} alt="sendIcon"/>
      </div>
      <p className={styles.info}>
        <span className={styles.bold}> Sent </span>
        {activity.info.amount} {activity.info.currency === 'dTZS' ? 'TZS ' : activity.info.currency === 'dUGX' ? 'UGX ' : 'Dimo'}  {/* here need only activity.info.currency - ChangeCurrency */}
        {activity.info.to ? 'to ' : 'from '}
        <span className={styles.bold}>{activity.info.to ? activity.info.to : activity.info.from}  ({activity.info.username})</span>
      </p>
      <p className={styles.time}>
        {moment(activity.timestamp).format("MMMM Do")}
      </p>
      {activity.info.to ? (
        <p className={`${styles.balance} ${styles.negativeBalance}`}>
          - {activity.info.currency === 'DIMO' ?
          `${beautifyDimoNumber(activity.info.amount)} ${beautifyDimoTitle(activity.info.amount)}` :
          `${activity.info.amount} ${activity.info.currency === 'dTZS' ? 'TZS' : activity.info.currency === 'dUGX' ? 'UGX' : 'Dimo'}`}   {/* here need only activity.info.currency - ChangeCurrency */}
        </p>
      ) : (
        <p className={`${styles.balance} ${styles.positiveBalance}`}>
          + {activity.info.currency === 'DIMO' ?
          `${beautifyDimoNumber(activity.info.amount)} ${beautifyDimoTitle(activity.info.amount)}` :
          `${activity.info.amount} ${activity.info.currency === 'dTZS' ? 'TZS' : activity.info.currency === 'dUGX' ? 'UGX' : 'Dimo'}`}   {/* here need only activity.info.currency - ChangeCurrency */}
        </p>
      )
      }
    </div>
  )
};

export default ActivityPointSend;


