import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuth, selectAuthError } from '../Login/selectors';
import Header from '../Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

export default withRouter(Layout);
