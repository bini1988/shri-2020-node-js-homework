/* eslint-disable import/prefer-default-export */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import createReduxStore from './services/redux/store';
import { AppSSR } from './components/App';
import { RootState } from './services/redux/reducer';

export const renderAppToString = (initialState: RootState, req: any) => {
  const store = createReduxStore(initialState);

  return renderToString(
    <I18nextProvider i18n={req.i18n}>
      <Provider store={store}>
        <AppSSR
          location={req.url}
          initialI18nStore={req.i18n.store}
          initialLanguage={req.i18n.language}/>
      </Provider>
    </I18nextProvider>,
  );
};
