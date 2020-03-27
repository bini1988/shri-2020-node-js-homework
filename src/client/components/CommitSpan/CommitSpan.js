import React from 'react';
import PropTypes from 'prop-types';
import './CommitSpan.scss';

function CommitSpan(props) {
  const { branch, hash } = props;

  return (
    <span className="CommitSpan">
      <span className="CommitSpan-Label">Commit: </span>
      <svg className="CommitSpan-Icon" width="16" height="16">
        <use xlinkHref="#code-commit" />
      </svg>
      <span className="CommitSpan-Branch">{branch}</span>
      <span className="CommitSpan-Hash">{hash}</span>
    </span>
  );
}

CommitSpan.propTypes = {
  branch: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default CommitSpan;
