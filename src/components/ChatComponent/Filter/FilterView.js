import React from 'react';

import styles from './Filter.module.scss';

export default ({className = '', search, onChange}) => (
    <div className={`${styles.filter} ${className}`.trim()}>
        <input className={styles.filter__input} placeholder={'Search'} value={search} onChange={onChange}/>
    </div>
);