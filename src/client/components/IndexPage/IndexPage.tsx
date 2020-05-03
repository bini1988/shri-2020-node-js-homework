import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { History } from 'history';
import MainPage from '../MainPage';
import BuildHistoryPage from '../BuildHistoryPage';
import { getSettingsValues } from '../../services/redux/reducer/settings';

export interface IIndexPageProps {
  history: History;
}

const IndexPage: FC<IIndexPageProps> = (props) => {
  const settings = useSelector(getSettingsValues);

  return (settings) ? (
    <BuildHistoryPage {...props} />
  ) : (
    <MainPage {...props} />
  );
}

export default IndexPage;
