import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import App from './containers/App';
import Invoice from './containers/Invoice';
import Header from './containers/Header';

const Routes = () => (
  <ConnectedRouter history={history}>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/invoice" component={Invoice} />
    </div>
  </ConnectedRouter>
);
export default Routes;
