import React from 'react';
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
  const { className, history, buildCard } = props;
  const handleSettings = () => history.push('/settings');

  return (
    <div className={classnames(className, bn())}>
      <PageHeader className={bn('Header')}>
        <PageHeader.Title accent>
          philip1967/my-awesome-repo
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
};

export default BuildDetailsPage;
