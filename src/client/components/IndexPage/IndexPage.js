import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../MainPage';
import BuildHistoryPage from '../BuildHistoryPage';

/**
 * Главная страница
 */
function IndexPage(props) {
  const { settings, fetchSettings, ...restProps } = props;

  return (settings) ? (
    <BuildHistoryPage {...restProps} />
  ) : (
    <MainPage {...restProps} />
  );
}

IndexPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  settings: PropTypes.object,
  fetchSettings: PropTypes.func,
};

export default IndexPage;
