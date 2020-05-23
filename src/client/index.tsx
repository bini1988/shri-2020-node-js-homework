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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('worker.js').then(() => {
      console.log('ServiceWoker registration successful');
    }).catch(error => {
      console.log('ServiceWoker registration failed: ', error);
    })
  });
}
