import React from 'react';
import { Portal } from 'components/Common';

import Loader from 'react-loader-spinner';

import styles from './EnterLoader.module.scss';

const EnterLoader = ({type}) => {
  console.log('TYPE', type);
  return (
    <Portal>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          {type === 'signUp' && (<p>We are preparing your account, please wait!</p>)}
          {type === 'login' && (<p>We are logging you in</p>)}
        </div>
        <div className={styles.loader}>
          <Loader
            type="BallTriangle"
            color="#3878ff"
            height={50}
            width={50}
            visible={true}
          />
        </div>
      </div>
    </Portal>
  );
};

export default EnterLoader;