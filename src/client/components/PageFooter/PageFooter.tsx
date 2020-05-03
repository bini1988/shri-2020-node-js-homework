import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './PageFooter.scss';
import Link from '../Link';

const bn = cn('PageFooter');

export interface IPageFooterProps {
  className?: string;
}

const PageFooter: FC<IPageFooterProps> = (props) => (
  <footer className={classnames(props.className, bn())}>
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

export default PageFooter;
