import React, { useCallback, FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { History } from 'history';
import { useTranslation } from 'react-i18next';
import './MainPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';

const bn = cn('MainPage');

export interface IMainPageProps {
  className?: string;
  history: History;
}

const MainPage: FC<IMainPageProps> = (props) => {
  const { className, history } = props;
  const { t } = useTranslation();
  const handleSettings =
    useCallback(() => history.push('/settings'), [history]);

  return (
    <div
      className={classnames(className, bn())}
      data-test="main-page"
    >
      <PageHeader className={bn('Header')}>
        <PageHeader.Title>
          School CI server
        </PageHeader.Title>
        <PageHeader.Aside>
          <Button
            adaptive
            label={t("settings_label")}
            iconName="settings"
            data-test="btn-settings"
            size="s"
            onClick={handleSettings}
          />
        </PageHeader.Aside>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <section className={bn('Intro')} data-test="intro">
            <div className={bn('Wrapper')}>
              <svg className={bn('Logo')} width="124" height="124">
                <use xlinkHref="#logo" />
              </svg>
              <p className={bn('Label')}>{t("settings_description")}</p>
              <Button
                theme="action"
                label={t("open_settings")}
                data-test="btn-settings"
                onClick={handleSettings}
              />
            </div>
          </section>
        </div>
      </main>
      <PageFooter className={bn('Footer')} />
    </div>
  );
}

export default MainPage;
