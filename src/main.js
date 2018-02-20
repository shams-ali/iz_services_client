import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import Layout from './layout';
import Login from './containers/Login';
import Home from './containers/Home';
import Invoice from './containers/Invoice';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/invoice" component={Invoice} />
        <Route path="/invoice/:id" component={Invoice} />
      </Layout>
    </Switch>
  </ConnectedRouter>
);
export default Routes;
