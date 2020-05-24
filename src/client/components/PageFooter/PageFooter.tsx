import React, { FC, MouseEvent, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { useTranslation } from 'react-i18next';
import './PageFooter.scss';
import Link from '../Link';

const bn = cn('PageFooter');

export interface IPageFooterProps {
  className?: string;
}

const PageFooter: FC<IPageFooterProps> = (props) => {
  const { t, i18n } = useTranslation();
  const handleLang = useCallback((event) => {
    event.preventDefault();
    i18n.changeLanguage(t("lang_value"));
  }, [ i18n ]);

  return (
    <footer className={classnames(props.className, bn())}>
      <div className={classnames(bn('Container'), 'Container')}>
        <ul className={bn('Menu')}>
          <li className={bn('Item')}>
            <Link href="#support" label={t("support_label")}/>
          </li>
          <li className={bn('Item')}>
            <Link href="#learning" label={t("learning_label")}/>
          </li>
          <li className={bn('Item')}>
            <Link href="#" label={t("lang_label")} onClick={handleLang}/>
          </li>
        </ul>
        <div className={bn('Copyright')}>
          &copy;2020 Your Name
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
