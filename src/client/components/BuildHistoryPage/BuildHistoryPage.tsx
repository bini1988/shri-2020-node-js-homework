/* eslint-disable no-unused-expressions */
import React, { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { useTranslation } from 'react-i18next';

import './BuildHistoryPage.scss';
import { getSettingOfRepoName } from '../../services/redux/reducer/settings';
import { getBuildsCards, fetchBuilds } from '../../services/redux/reducer/builds';
import useQueueBuildHandler from '../../hooks/useQueueBuildHandler';
import useDialogState from '../../hooks/useDialogState';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import Button from '../Button';
import BuildCard from '../BuildCard';
import NewBuildDialog from '../NewBuildDialog';

const bn = cn('BuildHistoryPage');

export interface IBuildHistoryPageProps {
  className?: string;
  history: History;
};

const BuildHistoryPage: FC<IBuildHistoryPageProps> = (props) => {
  const { className, history } = props;

  const { t } = useTranslation();
  const repoName = useSelector(getSettingOfRepoName);
  const buildsCards = useSelector(getBuildsCards);
  const dispatch = useDispatch();

  const queueBuild = useQueueBuildHandler(history);
  const { isDialogOpen, openDialog, closeDialog } = useDialogState();

  useEffect(() => {
    if (!buildsCards) {
      dispatch(fetchBuilds());
    }
  }, []);

  return (
    <div
      className={classnames(className, bn())}
      data-test="build-history-page"
    >
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          <Link to="/" className={bn('Link')}>{repoName}</Link>
        </PageHeader.Title>
        <PageHeader.Aside
          className={bn('Aside')}
        >
          <Button
            adaptive
            label={t("run_build_label")}
            iconName="play"
            data-test="btn-build"
            size="s"
            onClick={openDialog}
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
          <section className={bn('History')}>
            <ul className={bn('Items')} data-test="card-items">
              {buildsCards.map((build) => (
                <li className={bn('Item')} key={build.id}>
                  <Link
                    to={`/build/${build.id}`}
                    className={bn('Link')}
                    data-test="card-link"
                  >
                    <BuildCard interactive card={build} />
                  </Link>
                </li>
              ))}
            </ul>
            {(buildsCards.length > 0) && (
              <Button
                className={bn('More')}
                label={t("show_more_label")}
                size="s"
              />
            )}
          </section>
        </div>
        <NewBuildDialog
          isOpen={isDialogOpen}
          onCancel={closeDialog}
          onSubmit={({ commit }) => {
            closeDialog();
            queueBuild(commit);
          }}
        />
      </main>
      <PageFooter />
    </div>
  );
}

export default BuildHistoryPage;
