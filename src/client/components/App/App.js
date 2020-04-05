import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, StaticRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import '../../common/sass/blocks.scss';

import IndexPage from '../IndexPage';
import SettingsPage from '../SettingsPage';
import BuildDetailsPage from '../BuildDetailsPage';

function App({ router = {} }) {
  const Router = (process.env.SSR === true)
    ? StaticRouter : BrowserRouter;
  const { location, context } = router;

  return (
    <ToastProvider>
      <Router
        location={location}
        context={context}
      >
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/build/:id" component={BuildDetailsPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </ToastProvider>
  );
}

App.propTypes = {
  /** Параметры React Router */
  router: PropTypes.shape({
    location: PropTypes.object,
    context: PropTypes.object,
  }),
};

export default App;
