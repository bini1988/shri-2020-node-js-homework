import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './OwnerSpan.scss';

const bn = cn('OwnerSpan');

function OwnerSpan(props) {
  const { className, owner } = props;

  return (
    <span className={classnames(className, bn())}>
      <span className={bn('Label')}>Author: </span>
      <svg className={bn('Icon')} width="16" height="16">
        <use xlinkHref="#user" />
      </svg>
      <span className={bn('Name')}>{owner}</span>
    </span>
  );
}

OwnerSpan.propTypes = {
  className: PropTypes.string,
  owner: PropTypes.string,
};

export default OwnerSpan;
