import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import store from './services/redux/store';
import { fetchSettings } from './services/redux/reducer/settings';
import App from './components/App';

store.dispatch(fetchSettings());

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById('app'),
);
