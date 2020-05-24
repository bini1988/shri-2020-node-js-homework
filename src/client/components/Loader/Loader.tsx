import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Loader.scss';

const bn = cn('Loader');

export interface ILoaderProps {
  className?: string;
  center?: boolean;
}

const Loader: FC<ILoaderProps> = ({ className, center }) => (
  <div className={classnames(className, bn({ center }))}>
    <div className={bn('Wrap')}/>
  </div>
);

export default Loader;
