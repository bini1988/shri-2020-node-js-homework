import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import BuildCard from '../BuildCard';

/**
 * Страница 'История сборок'
 */
function BuildHistoryPage() {
  return (
    <>
      <PageHeader view="accent">
        <Link
          className="Header-Button Button Button_theme_normal Button_adaptive Button_size_s"
          to="/build-details"
        >
          <span className="Button-Wrapper">
            <svg className="Button-Icon" width="12" height="12">
              <use xlinkHref="#play" />
            </svg>
            <span className="Button-Label">{'Run build'}</span>
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
          <section className="Main-BuildHistoryPage BuildHistoryPage">
            <h3 className="BuildHistoryPage-Title BuildHistoryPage-Title_hidden">{'BuildHistoryPage'}</h3>
            <ul className="BuildHistoryPage-Items">
              {Array.from({ length: 9 }).map((id) => (
                <li className="BuildHistoryPage-Item" key={id}>
                  <BuildCard />
                </li>
              ))}
            </ul>
            <button className="BuildHistoryPage-More Button Button_theme_normal Button_size_s" type="button">
              <span className="Button-Wrapper">
                <span className="Button-Label">
                  {'Show more'}
                </span>
              </span>
            </button>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

export default BuildHistoryPage;
