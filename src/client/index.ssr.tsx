/* eslint-disable import/prefer-default-export */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createReduxStore from './services/redux/store';
import { AppSSR } from './components/App';
import { RootState } from './services/redux/reducer';

export const renderAppToString = (initialState: RootState, location: string) => {
  const store = createReduxStore(initialState);

  return renderToString(
    <Provider store={store}>
      <AppSSR location={location} />
    </Provider>,
  );
};
