/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildHistoryPage.scss';
import { getSettingOfRepoName } from '../../services/redux/reducer/settings';
import { getBuildsCards, fetchBuilds } from '../../services/redux/reducer/builds';
import useQueueBuildHandler from '../../hooks/useQueueBuildHandler';
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

  const repoName = useSelector(getSettingOfRepoName);
  const buildsCards = useSelector(getBuildsCards);
  const dispatch = useDispatch();

  const handleQueueBuild = useQueueBuildHandler(history);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => setDialogOpen(false);

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
            label="Run build"
            iconName="play"
            data-test="btn-build"
            size="s"
            onClick={() => setDialogOpen(true)}
          />
          <Button
            label="Settings"
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
            <h3 className={bn('Title')}>
              BuildHistoryPage
            </h3>
            <ul className={bn('Items')} data-test="card-items">
              {buildsCards.map((build = {}) => (
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
            {(buildsCards > 0) && (
              <Button
                className={bn('More')}
                label="Show more"
                size="s"
              />
            )}
          </section>
        </div>
        <NewBuildDialog
          isOpen={isDialogOpen}
          onCancel={handleClose}
          onSubmit={({ commit }) => {
            handleClose();
            handleQueueBuild(commit);
          }}
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
