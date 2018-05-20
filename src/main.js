import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import Layout from './layout';
import Login from './containers/Login';
import Invoice from './containers/Invoice';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Invoice} />
        <Route path="/login" component={Login} />
        <Route exact path="/invoice/:id/:receipt" component={Invoice} />
        <Route exact path="/invoice" component={Invoice} />
        <Route exact path="/invoice/:id" component={Invoice} />
      </Layout>
    </Switch>
  </ConnectedRouter>
);
export default Routes;
