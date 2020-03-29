import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildDetailsPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';
import ConsoleLog from '../ConsoleLog';
import log from '../../mock-data';

const bn = cn('BuildDetailsPage');

/**
 * Информация о сборке
 */
function BuildDetailsPage(props) {
  const {
    className, history, buildCard, repoName,
  } = props;

  useEffect(() => {
    if (!buildCard) {
      history.push('/history');
    }
  }, [history, buildCard]);

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          {repoName}
        </PageHeader.Title>
        <PageHeader.Aside className={bn('Aside')}>
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
            onClick={() => history.push('/settings')}
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
              card={buildCard}
            />
            <ConsoleLog className={bn('Log')}>
              {log}
            </ConsoleLog>
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
  buildCard: PropTypes.object,
  repoName: PropTypes.string,
};

export default BuildDetailsPage;
