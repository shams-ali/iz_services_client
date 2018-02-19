import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import { selectAuth } from '../Login/selectors';

const Header = ({ auth }) => (
  <AppBar
    title="Registration Invoice Generator"
    iconElementLeft={
      <Link to="/" href="/">
        <IconButton>
          <ActionHome />
        </IconButton>
      </Link>
    }
    iconElementRight={
      auth ? (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="WalkIn Application" href="/invoice" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      ) : (
        <MenuItem primaryText="Login" href="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: selectAuth(state)
});

export default withRouter(connect(mapStateToProps)(Header));
