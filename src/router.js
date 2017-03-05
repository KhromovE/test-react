import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Containers
import AppContainer from './containers/App';
import DashBoardContainer from './containers/Dashboard';

export default (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/" component={DashBoardContainer} />
      <Route path="*" />
    </Route>
  </Router>
);
