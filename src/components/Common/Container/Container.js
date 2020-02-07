import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.module.scss';

export const Container = ({ className, children }) => {
  return (
    <div
      className={`${styles.wrapperContainer}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: ''
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
