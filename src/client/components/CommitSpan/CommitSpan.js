import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './CommitSpan.scss';

const bn = cn('CommitSpan');

function CommitSpan(props) {
  const { className, branch, hash } = props;

  return (
    <span className={classnames(className, bn())}>
      <span className={bn('Label')}>Commit: </span>
      <svg className={bn('Icon')} width="16" height="16">
        <use xlinkHref="#code-commit" />
      </svg>
      <span className={bn('Branch')}>{branch}</span>
      <span className={bn('Hash')}>{hash}</span>
    </span>
  );
}

CommitSpan.propTypes = {
  className: PropTypes.string,
  branch: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default CommitSpan;
