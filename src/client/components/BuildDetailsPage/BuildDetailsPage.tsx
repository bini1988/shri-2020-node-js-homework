/* eslint-disable no-unused-expressions */
import React, { useEffect, FC } from 'react';
import { Link, match } from 'react-router-dom';
import { History } from 'history';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { useTranslation } from 'react-i18next';

import './BuildDetailsPage.scss';
import {
  getBuildCardById,
  getBuildLogsById,
  fetchBuildById,
  fetchBuildLogsById,
} from '../../services/redux/reducer/builds';
import { getSettingOfRepoName } from '../../services/redux/reducer/settings';
import { RootState } from '../../services/redux/reducer';
import useQueueBuildHandler from '../../hooks/useQueueBuildHandler';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';
import ConsoleLog from '../ConsoleLog';

const bn = cn('BuildDetailsPage');

export interface IBuildDetailsPageParams {
  /** Индентификатор сборки */
  id: string;
}
export interface IBuildDetailsPageProps {
  className?: string;
  history: History;
  match: match<IBuildDetailsPageParams>;
};

const BuildDetailsPage: FC<IBuildDetailsPageProps> = (props) => {
  const { className, history, match } = props;
  const buildId = match && match.params.id;

  const { t } = useTranslation();
  const repoName = useSelector(getSettingOfRepoName);
  const buildCard =useSelector<RootState, CI.Build>(
    (state) => getBuildCardById(state, buildId)
  );
  const buildLogs =useSelector<RootState, string>(
    (state) => getBuildLogsById(state, buildId)
  );
  const dispatch = useDispatch();

  const { commitHash } = buildCard || {};
  const handleQueueBuild = useQueueBuildHandler(history);

  useEffect(() => {
    dispatch(fetchBuildById(buildId));
    dispatch(fetchBuildLogsById(buildId));
  }, [buildId]);

  return (
    <div
      className={classnames(className, bn())}
      data-test="build-details-page"
    >
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          <Link to="/" className={bn('Link')}>{repoName}</Link>
        </PageHeader.Title>
        <PageHeader.Aside className={bn('Aside')}>
          <Button
            adaptive
            label={t("rebuild_label")}
            iconName="rebuild"
            data-test="btn-rebuild"
            size="s"
            onClick={() => handleQueueBuild(commitHash)}
          />
          <Button
            label={t("settings_label")}
            iconName="settings"
            data-test="btn-settings"
            size="s"
            view="tile"
            onClick={() => history.push('/settings')}
          />
        </PageHeader.Aside>
      </PageHeader>
      <main className={bn('Main')}>
        <div className={classnames(bn('Container'), 'Container')}>
          <section className={bn('Details')} data-test="details">
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

export default BuildDetailsPage;
