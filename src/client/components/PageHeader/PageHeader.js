import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './PageHeader.scss';
import Title from '../Title';

const bn = cn('PageHeader');

/**
 * Шапка страницы
 */
function PageHeader(props) {
  const { className, children } = props;

  return (
    <header className={classnames(className, bn())}>
      <div className={classnames(bn('Container'), 'Container')}>
        {children}
      </div>
    </header>
  );
}

PageHeader.Title = ({ className, ...props }) => (
  <Title
    {...props}
    className={classnames(className, bn('Title'))}
    data-test="title"
  />
);
PageHeader.Aside = ({ className, ...props }) => (
  <div
    {...props}
    className={classnames(className, bn('Aside'))}
    data-test="aside"
  />
);

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
PageHeader.Title.propTypes = {
  className: PropTypes.string,
};
PageHeader.Aside.propTypes = {
  className: PropTypes.string,
};

export default PageHeader;
