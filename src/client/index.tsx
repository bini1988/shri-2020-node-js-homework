/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from './services/redux/store';
import { App } from './components/App';

const store = createReduxStore(window.__INITIAL_STATE__);
const container = document.getElementById('app');
const element = (
  <Provider store={store}>
    <App />
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(element, container);
} else {
  ReactDOM.render(element, container);
}
