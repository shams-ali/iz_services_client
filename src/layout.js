import React from 'react';
import { Redirect } from 'react-router-dom';
import { ModalContainer } from 'react-redux-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from './containers/Login/actions';
import { selectAuth } from './containers/Login/selectors';
import Header from './components/Header';

const Layout = ({ children, actions: { logOut: dispatchLogOut } }) => {
  const { token } = JSON.parse(localStorage.getItem('auth')) || {};
  const { pathname } = window.location;
  if (pathname !== '/login' && !token) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {<ModalContainer />}
      {<Header token={token} logOut={dispatchLogOut} />}
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  auth: selectAuth(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logOut }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
