/* eslint-disable import/prefer-default-export */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import createReduxStore from './services/redux/store';
import App from './components/App';

/**
 * @param {Object} initialState Исходное состояние Redux Store
 */
export const renderAppToString = (initialState, router) => {
  const store = createReduxStore(initialState);

  return renderToString(
    <Provider store={store}>
      <App router={router} />
    </Provider>,
  );
};
