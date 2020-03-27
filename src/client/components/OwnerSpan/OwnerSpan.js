import React from 'react';
import PropTypes from 'prop-types';
import './OwnerSpan.scss';

function OwnerSpan(props) {
  const { owner } = props;

  return (
    <span className="OwnerSpan">
      <span className="OwnerSpan-Label">Author: </span>
      <svg className="OwnerSpan-Icon" width="16" height="16">
        <use xlinkHref="#user" />
      </svg>
      <span className="OwnerSpan-Name">{owner}</span>
    </span>
  );
}

OwnerSpan.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default OwnerSpan;
