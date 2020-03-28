import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './MainPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';

const bn = cn('MainPage');

/**
 * Страница приветствия
 */
function MainPage({ className, history }) {
  const handleSettings = () => history.push('/settings');

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title>
          School CI server
        </PageHeader.Title>
        <PageHeader.Aside>
          <Button
            adaptive
            label="Settings"
            iconName="settings"
            size="s"
            onClick={handleSettings}
          />
        </PageHeader.Aside>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <section className={bn('Intro')}>
            <div className={bn('Wrapper')}>
              <svg className={bn('Logo')} width="124" height="124">
                <use xlinkHref="#logo" />
              </svg>
              <p className={bn('Label')}>
                Configure repository connection and&nbsp;synchronization settings
              </p>
              <Button
                theme="action"
                label="Open settings"
                onClick={handleSettings}
              />
            </div>
          </section>
        </div>
      </main>
      <PageFooter
        className={bn('Footer')}
      />
    </div>
  );
}

MainPage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default MainPage;
