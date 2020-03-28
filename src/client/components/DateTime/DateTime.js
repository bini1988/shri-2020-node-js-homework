import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './DateTime.scss';

const bn = cn('DateTime');
const iconNames = {
  date: 'calendar',
  time: 'stopwatch',
};

function DateTime(props) {
  const { className, dateTime, view } = props;
  const iconName = iconNames[view];

  return (
    <span className={classnames(className, bn({ view }))}>
      {!!iconName && (
        <svg className={bn('Icon')} width="16" height="16">
          <use xlinkHref={`#${iconName}`} />
        </svg>
      )}
      <span className={bn('Label')}>Date:</span>
      <time className={bn('Time')} dateTime={dateTime}>
        21 янв, 03:06
      </time>
    </span>
  );
}

DateTime.defaultProps = {
  view: 'date',
};
DateTime.propTypes = {
  className: PropTypes.string,
  dateTime: PropTypes.string,
  view: PropTypes.oneOf([
    'date', 'time',
  ]),
};

export default DateTime;
