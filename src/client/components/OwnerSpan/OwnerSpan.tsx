import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './OwnerSpan.scss';

const bn = cn('OwnerSpan');

export interface IOwnerSpanProps {
  className?: string;
  owner: string;
}

const OwnerSpan: FC<IOwnerSpanProps> = (props) => (
  <span className={classnames(props.className, bn())}>
    <span className={bn('Label')}>Author: </span>
    <svg className={bn('Icon')} width="16" height="16">
      <use xlinkHref="#user" />
    </svg>
    <span className={bn('Name')}>{props.owner}</span>
  </span>
);

export default OwnerSpan;
