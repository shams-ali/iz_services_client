import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import Layout from './containers/Layout';
import Login from './containers/Login';
import Home from './containers/Home';
import Invoice from './containers/Invoice';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/invoice" component={Invoice} />
      </Layout>
    </Switch>
  </ConnectedRouter>
);
export default Routes;
