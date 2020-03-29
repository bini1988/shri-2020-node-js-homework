import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import '../../common/sass/blocks.scss';

import IndexPage from '../IndexPage';
import SettingsPage from '../SettingsPage';
import BuildDetailsPage from '../BuildDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/build/:id" component={BuildDetailsPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
