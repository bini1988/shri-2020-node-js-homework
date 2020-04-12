/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildHistoryPage.scss';
import { getSettingOfRepoName } from '../../services/redux/reducer/settings';
import { getBuildsCards, fetchBuilds, queueBuild } from '../../services/redux/reducer/builds';
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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  useEffect(() => {
    if (!buildsCards) {
      dispatch(fetchBuilds());
    }
  }, []);

  return (
    <div className={classnames(className, bn())}>
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
              {buildsCards.map((build = {}) => (
                <li className={bn('Item')} key={build.id}>
                  <Link className={bn('Link')} to={`/build/${build.id}`}>
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
          onCancel={closeDialog}
          onSubmit={({ commit }) => {
            closeDialog();
            if (commit) {
              dispatch(queueBuild(commit)).then(({ id }) => {
                id && history.push(`/build/${id}`);
              });
            }
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
