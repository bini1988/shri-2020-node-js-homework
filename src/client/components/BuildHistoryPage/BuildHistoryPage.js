import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildHistoryPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';
import NewBuildDialog from '../NewBuildDialog';

const bn = cn('BuildHistoryPage');

/**
 * Страница 'История сборок'
 */
function BuildHistoryPage(props) {
  const { className, history } = props;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          School CI server
        </PageHeader.Title>
        <PageHeader.Aside
          className={bn('Aside')}
        >
          <Button
            adaptive
            label="Run build"
            iconName="play"
            size="s"
            onClick={() => setDialogOpen(true)}
          />
          <Button
            label="Settings"
            iconName="settings"
            size="s"
            view="tile"
            onClick={() => history.push('/settings')}
          />
        </PageHeader.Aside>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <section className={bn('History')}>
            <h3 className={bn('Title')}>
              BuildHistoryPage
            </h3>
            <ul className={bn('Items')}>
              {Array.from({ length: 9 }).map((_, id) => (
                <li className={bn('Item')} key={id}>
                  <BuildCard
                    interactive
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
                </li>
              ))}
            </ul>
            <Button
              className={bn('More')}
              label="Show more"
              size="s"
            />
          </section>
        </div>
        <NewBuildDialog
          isOpen={isDialogOpen}
          onCancel={closeDialog}
          onSubmit={() => closeDialog()}
        />
      </main>
      <PageFooter />
    </div>
  );
}

BuildHistoryPage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BuildHistoryPage;
