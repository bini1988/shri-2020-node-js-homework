import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../../common/sass/blocks.scss';

import MainPage from '../MainPage';
import SettingsPage from '../SettingsPage';
import BuildHistoryPage from '../BuildHistoryPage';
import BuildDetailsPage from '../BuildDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/history" component={BuildHistoryPage} />
        <Route exact path="/details" component={BuildDetailsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
