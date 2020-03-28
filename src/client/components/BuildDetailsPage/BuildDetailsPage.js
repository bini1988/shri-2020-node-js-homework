import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildDetailsPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';

const bn = cn('BuildDetailsPage');

/**
 * Информация о сборке
 */
function BuildDetailsPage({ className, history }) {
  const handleSettings = () => history.push('/settings');

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          philip1967/my-awesome-repo
        </PageHeader.Title>
        <PageHeader.Aside
          className={bn('Aside')}
        >
          <Button
            adaptive
            label="Rebuild"
            iconName="rebuild"
            size="s"
          />
          <Button
            label="Settings"
            iconName="settings"
            size="s"
            view="tile"
            onClick={handleSettings}
          />
        </PageHeader.Aside>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <section className={bn('Details')}>
            <h3 className={bn('Title')}>
              BuildDetailsPage
            </h3>
            <BuildCard
              className="BuildDetailsPage-Card"
              view="details"
              card={{
                status: 'Waiting',
                buildNumber: 1368,
                commitMessage: 'add documentation for postgres scaler',
                branchName: 'master',
                commitHash: '9c9f0b9',
                authorName: 'Philip Kirkorov',
                start: '2020-01-21T03:06:00.000',
              }}
            />
            <div className={bn('ConsoleLog')}>
              <pre className={bn('Wrappper')}>
                Log...
              </pre>
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

BuildDetailsPage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BuildDetailsPage;
