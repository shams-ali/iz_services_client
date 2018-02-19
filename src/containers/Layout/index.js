import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ModalContainer } from 'react-redux-dialog';

import { selectAuth, selectAuthError } from '../Login/selectors';
import Header from '../Header';

const Layout = ({ children }) => (
  <div>
    <ModalContainer />
    <Header />
    <main>{children}</main>
  </div>
);

export default withRouter(Layout);
