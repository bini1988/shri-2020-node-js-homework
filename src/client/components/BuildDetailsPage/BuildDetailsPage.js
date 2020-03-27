import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import BuildCard from '../BuildCard';

/**
 * Информация о сборке
 */
function BuildDetailsPage() {
  return (
    <>
      <PageHeader view="accent">
        <Link
          className="Header-Button Button Button_theme_normal Button_adaptive Button_size_s"
          to="/rebuild"
        >
          <span className="Button-Wrapper">
            <svg className="Button-Icon" width="12" height="12">
              <use xlinkHref="#rebuild" />
            </svg>
            <span className="Button-Label">{'Rebuild'}</span>
          </span>
        </Link>
        <Link
          className="Header-Button Button Button_theme_normal Button_size_s Button_view_tile"
          to="/settings"
        >
          <span className="Button-Wrapper">
            <svg className="Button-Icon" width="12" height="12">
              <use xlinkHref="#settings" />
            </svg>
            <span className="Button-Label">{'Settings'}</span>
          </span>
        </Link>
      </PageHeader>
      <main className="Page-Main Main">
        <div className="Main-Container Container">
          <section className="Main-BuildDetailsPage BuildDetailsPage">
            <h3 className="BuildDetailsPage-Title BuildDetailsPage-Title_hidden">
              {'BuildDetailsPage'}
            </h3>
            <BuildCard className="BuildDetailsPage-Card" view="details" />
            <div className="BuildDetailsPage-ConsoleLog ConsoleLog">
              <pre className="ConsoleLog-Wrappper">
                {'Log...'}
              </pre>
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

export default BuildDetailsPage;
