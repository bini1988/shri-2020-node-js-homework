import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './PageFooter.scss';
import Link from '../Link';

const bn = cn('PageFooter');

/**
 * Подвал страницы
 */
function PageFooter(props) {
  const { className } = props;

  return (
    <footer className={classnames(className, bn())}>
      <div className={classnames(bn('Container'), 'Container')}>
        <ul className={bn('Menu')}>
          <li className={bn('Item')}>
            <Link href="#support" label="Support" />
          </li>
          <li className={bn('Item')}>
            <Link href="#learning" label="Learning" />
          </li>
        </ul>
        <div className={bn('Copyright')}>
          &copy;2020 Your Name
        </div>
      </div>
    </footer>
  );
}

PageFooter.propTypes = {
  className: PropTypes.string,
};

export default PageFooter;
