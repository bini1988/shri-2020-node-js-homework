import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Title.scss';

const bn = cn('Title');

export interface ITitleProps {
  className?: string;
  accent?: boolean;
}

const Title: FC<ITitleProps> = ({ accent, ...props }) => (
  <h1 {...props} className={classnames(props.className, bn({ accent }))}/>
);

export default Title;
