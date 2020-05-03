import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Loader.scss';

const bn = cn('Loader');

export interface ILoaderProps {
  className?: string;
}

const Loader: FC<ILoaderProps> = (props) => (
  <div className={classnames(props.className, bn())} />
);

export default Loader;
