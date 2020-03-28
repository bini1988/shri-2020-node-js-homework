import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Title.scss';

const bn = cn('Title');

function Title(props) {
  const { className, accent, children } = props;

  return (
    <h1 className={classnames(className, bn({ accent }))}>
      {children}
    </h1>
  );
}

Title.propTypes = {
  className: PropTypes.string,
  accent: PropTypes.bool,
  children: PropTypes.any,
};

export default Title;
