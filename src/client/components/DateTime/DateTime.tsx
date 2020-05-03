import React, { FC } from 'react';
import formatDate from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import isValid from 'date-fns/isValid';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './DateTime.scss';

const bn = cn('DateTime');

export type ViewType = 'date' | 'time';
export interface IDateTimeProps {
  className?: string;
  dateTime: string;
  view: ViewType;
}

const viewProps = {
  date: { iconName: 'calendar', label: 'Date', format: 'd MMM, HH:mm' },
  time: { iconName: 'stopwatch', label: 'Time', format: 'H ч m мин' },
};

const DateTime: FC<IDateTimeProps> = (props) => {
  const { className, dateTime, view } = props;
  const { iconName, label, format } = viewProps[view];
  const date = new Date(dateTime);

  return (
    <span className={classnames(className, bn({ view }))}>
      {!!iconName && (
        <svg className={bn('Icon')} width="16" height="16">
          <use xlinkHref={`#${iconName}`} />
        </svg>
      )}
      {label && (<span className={bn('Label')}>{label}</span>)}
      {isValid(date) && (
        <time className={bn('Time')} dateTime={dateTime}>
          {formatDate(date, format, { locale: ruLocale })}
        </time>
      )}
    </span>
  );
}

DateTime.defaultProps = {
  view: 'date',
};

export default DateTime;
