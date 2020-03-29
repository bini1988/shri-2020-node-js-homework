import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './SettingsPage.scss';
import useNotification from '../../hooks/useNotification';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import SettingsForm from '../SettingsForm';

const bn = cn('SettingsPage');

/**
 * Страница 'Настройки'
 */
function SettingsPage(props) {
  const { className, settings, saveSettings } = props;
  const { onError, onSuccess } = useNotification();
  const handleSubmit = (values) => saveSettings(values)
    .then(() => onSuccess('Settings successfully saved'))
    .catch((error) => onError(error.message));

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title>
          School CI server
        </PageHeader.Title>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <SettingsForm
            className={bn('Settings')}
            initialSettings={settings}
            onSubmit={handleSubmit}
          />
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
  settings: PropTypes.object,
  saveSettings: PropTypes.func,
};

export default SettingsPage;
