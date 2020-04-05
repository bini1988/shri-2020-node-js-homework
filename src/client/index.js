/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createReduxStore from './services/redux/store';
import App from './components/App';

const store = createReduxStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
