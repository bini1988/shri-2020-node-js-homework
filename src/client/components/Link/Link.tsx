import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Link.scss';

const bn = cn('Link');

export interface ILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  label?: string;
  href?: string;
}

const Link: FC<ILinkProps> = ({ label, children, ...props }) => (
  <a {...props} className={classnames(props.className, bn())}>
    {label}{children}
  </a>
);

export default Link;
