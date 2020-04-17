import React from 'react';
import { useSelector } from 'react-redux';

import MainPage from '../MainPage';
import BuildHistoryPage from '../BuildHistoryPage';
import { getSettingsValues } from '../../services/redux/reducer/settings';

/**
 * Главная страница
 */
function IndexPage(props) {
  const settings = useSelector(getSettingsValues);

  return (settings) ? (
    <BuildHistoryPage {...props} />
  ) : (
    <MainPage {...props} />
  );
}

export default IndexPage;
