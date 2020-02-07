import React from 'react';
import PropTypes from 'prop-types';

import styles from './WrapperSection.module.scss';

export const WrapperSection = ({ className, children }) => {
  return (
    <section
      className={`${styles.wrapperSection}${className ? ` ${className}` : ''}`}
    >
      {children}
    </section>
  );
};

WrapperSection.defaultProps = {
  className: ''
};

WrapperSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
