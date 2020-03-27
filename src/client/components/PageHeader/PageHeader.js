import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.scss';

/**
 * Шапка страницы
 */
function PageHeader({ children }) {
  return (
    <header className="Page-Header PageHeader">
      <div className="PageHeader-Container Container">
        <h1 className="PageHeader-Title Title">School CI server</h1>
        <div className="PageHeader-Aside">
          {children}
        </div>
      </div>
    </header>
  );
}

PageHeader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageHeader;
