import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import PropTypes from 'prop-types';

const Header = ({ token, logOut, username }) => (
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
      token ? (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="WalkIn Application" href="/invoice/new" />
          <MenuItem primaryText={`Sign out: ${username}`} onClick={logOut} />
        </IconMenu>
      ) : (
        <MenuItem primaryText="Login" href="/login" />
      )
    }
  />
);

Header.defaultProps = {
  username: '',
  token: null
};

Header.propTypes = {
  username: PropTypes.string,
  token: PropTypes.string,
  logOut: PropTypes.func.isRequired
};

export default Header;
