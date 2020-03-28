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

PageHeader.Title = (props) => (
  <Title {...props} className={bn('Title')} />
);
PageHeader.Aside = (props) => (
  <div {...props} className={bn('Aside')} />
);

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default PageHeader;
