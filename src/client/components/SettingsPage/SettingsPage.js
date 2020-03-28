import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './SettingsPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import SettingsForm from '../SettingsForm';

const bn = cn('SettingsPage');

/**
 * Страница 'Настройки'
 */
function SettingsPage({ className }) {
  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title>
          School CI server
        </PageHeader.Title>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <SettingsForm className={bn('Settings')} />
        </div>
      </main>
      <PageFooter
        className={bn('Footer')}
      />
    </div>
  );
}

SettingsPage.propTypes = {
  className: PropTypes.string,
};

export default SettingsPage;
