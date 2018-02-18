import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuth } from '../Login/actions';
import { selectAuth, selectAuthError } from '../Login/selectors';
import Header from '../Header';

const Layout = ({ children, auth }) => {
  console.log(auth, 'this is auth');
  if (!auth) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: selectAuth(state)
});

export default withRouter(connect(mapStateToProps)(Layout));
