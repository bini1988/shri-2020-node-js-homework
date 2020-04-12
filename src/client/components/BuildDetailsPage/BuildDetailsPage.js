import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildDetailsPage.scss';
import {
  getBuildCardById,
  getBuildLogsById,
  fetchBuildById,
  fetchBuildLogsById,
} from '../../services/redux/reducer/builds';
import { getSettingOfRepoName } from '../../services/redux/reducer/settings';
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
  const { className, history, match } = props;
  const buildId = match && match.params.id;

  const dispatch = useDispatch();
  const repoName = useSelector(getSettingOfRepoName);
  const buildCard = useSelector((state) => getBuildCardById(state, buildId));
  const buildLogs = useSelector((state) => getBuildLogsById(state, buildId));

  useEffect(() => {
    dispatch(fetchBuildById(buildId));
    dispatch(fetchBuildLogsById(buildId));
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
};

export default BuildDetailsPage;
