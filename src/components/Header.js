import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';

const Header = ({ token, logOut }) => (
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
          <MenuItem primaryText="Sign out" onClick={logOut} />
        </IconMenu>
      ) : (
        <MenuItem primaryText="Login" href="/login" />
      )
    }
  />
);

export default Header;
