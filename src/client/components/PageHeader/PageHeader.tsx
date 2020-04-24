import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './PageHeader.scss';
import Title from '../Title';
import { ITitleProps } from '../Title/Title';

const bn = cn('PageHeader');

export interface IPageHeader {
  className?: string;
}
export interface IPageHeaderTitleProps extends ITitleProps {
  className?: string;
}
export interface IPageHeaderAsideProps extends ITitleProps {
  className?: string;
}
export interface PageHeaderComponent<P> extends FC<P> {
  Title: FC<IPageHeaderTitleProps>;
  Aside: FC<IPageHeaderTitleProps>;
}

const PageHeader: PageHeaderComponent<IPageHeader> = (props) => {
  const { className, children } = props;

  return (
    <header className={classnames(className, bn())}>
      <div className={classnames(bn('Container'), 'Container')}>
        {children}
      </div>
    </header>
  );
}

PageHeader.Title = (props) => (
  <Title {...props}
    className={classnames(props.className, bn('Title'))}
    data-test="title"
  />
);
PageHeader.Aside = (props) => (
  <div {...props}
    className={classnames(props.className, bn('Aside'))}
    data-test="aside"
  />
);

export default PageHeader;
