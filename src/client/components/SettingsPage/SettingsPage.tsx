import React, { useCallback, FC } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
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

export interface ISettingsPageProps {
  className?: string;
  history: History;
}

const SettingsPage: FC<ISettingsPageProps> = (props) => {
  const { className, history } = props;
  const settings = useSelector(getSettingsValues);
  const handleSubmit = useSettingsSubmit(
    useCallback(() => history.push('/history'), [history]),
  );

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
            initial={settings}
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

export default SettingsPage;
