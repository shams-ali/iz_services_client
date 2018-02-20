import React from 'react';
import { withRouter } from 'react-router-dom';
import { ModalContainer } from 'react-redux-dialog';
import { connect } from 'react-redux';

import Header from './components/Header';
import { selectAuth } from './containers/Login/selectors';

const Layout = ({ children, auth }) => (
  <div>
    <ModalContainer />
    <Header auth={auth} />
    <main>{children}</main>
  </div>
);

const mapStateToProps = state => ({
  auth: selectAuth(state)
});
export default withRouter(connect(mapStateToProps)(Layout));
