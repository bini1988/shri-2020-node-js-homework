import React from 'react';
import PropTypes from 'prop-types';
import './DateTime.scss';

function DateTime(props) {
  const { dateTime } = props;

  return (
    <span className="DateTime DateTime_view_date">
      <svg className="DateTime-Icon" width="16" height="16">
        <use xlinkHref="#calendar" />
      </svg>
      <span className="DateTime-Label">Date:</span>
      <time className="DateTime-Time" dateTime={dateTime}>
        21 янв, 03:06
      </time>
    </span>
  );
}

DateTime.propTypes = {
  dateTime: PropTypes.string.isRequired,
};

export default DateTime;
