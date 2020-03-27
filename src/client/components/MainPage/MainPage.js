import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';

/**
 * Страница приветствия
 */
function MainPage() {
  return (
    <>
      <PageHeader>
        <Link
          className="Button Button_theme_normal Button_size_s Button_adaptive"
          to="/details"
        >
          <span className="Button-Wrapper">
            <svg className="Button-Icon" width="12" height="12">
              <use xlinkHref="#settings" />
            </svg>
            <span className="Button-Label">Settings</span>
          </span>
        </Link>
      </PageHeader>
      <main className="Page-Main Main Main_align_center">
        <div className="Main-Container Container">
          <section className="Main-Intro Intro">
            <div className="Intro-Wrapper">
              <svg className="Intro-Logo" width="124" height="124">
                <use xlinkHref="#logo" />
              </svg>
              <p className="Intro-Label">
                Configure repository connection and&nbsp;synchronization settings
              </p>
              <Link className="Intro-Settings Button Button_theme_action" to="/settings">
                <span className="Button-Wrapper">
                  <span className="Button-Label">
                    Open settings
                  </span>
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

export default MainPage;
