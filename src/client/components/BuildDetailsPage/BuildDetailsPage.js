import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildDetailsPage.scss';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';
import ConsoleLog from '../ConsoleLog';

const bn = cn('BuildDetailsPage');

/**
 * Информация о сборке
 */
function BuildDetailsPage(props) {
  const {
    className, history, match, buildCard, buildLogs, repoName, fetchBuildById, fetchBuildLogsById,
  } = props;
  const buildId = match && match.params.id;

  useEffect(() => {
    fetchBuildById(buildId);
    fetchBuildLogsById(buildId);
  }, []);

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          <Link to="/" className={bn('Link')}>{repoName}</Link>
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
              {buildLogs || 'Loading log...'}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  buildCard: PropTypes.object,
  buildLogs: PropTypes.string,
  repoName: PropTypes.string,
  fetchBuildById: PropTypes.func,
  fetchBuildLogsById: PropTypes.func,
};

export default BuildDetailsPage;
