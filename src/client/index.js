import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './services/redux/store';
import { fetchSettings } from './services/redux/reducer/settings';
import App from './components/App';

store.dispatch(fetchSettings());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
