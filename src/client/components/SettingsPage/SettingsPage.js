import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { useSelector } from 'react-redux';

import './SettingsPage.scss';
import { getSettingsValues } from '../../services/redux/reducer/settings';
import useSettingsSubmit from '../../hooks/useSettingsSubmit';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import SettingsForm from '../SettingsForm';

const bn = cn('SettingsPage');

/**
 * Страница 'Настройки'
 */
function SettingsPage(props) {
  const { className, history } = props;
  const settings = useSelector(getSettingsValues);
  const handleSubmit = useSettingsSubmit({
    onSuccess: useCallback(() => history.push('/history'), [history]),
  });

  return (
    <div
      className={classnames(className, bn())}
      data-test="settings-page"
    >
      <PageHeader className={bn('Header')}>
        <PageHeader.Title>
          <Link to="/" className={bn('Link')}>School CI server</Link>
        </PageHeader.Title>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <SettingsForm
            className={bn('Settings')}
            initialSettings={settings}
            onSubmit={handleSubmit}
            onCancel={() => history.goBack()}
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
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default SettingsPage;
