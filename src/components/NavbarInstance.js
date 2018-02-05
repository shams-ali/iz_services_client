import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const { Header, Brand } = Navbar;
const NavbarInstance = () => (
  <Navbar>
    <Header>
      <Brand>
        <a href="/">Registration System</a>
      </Brand>
    </Header>
    <Nav>
      <NavItem eventKey={1} href="/summary">
        Summary
      </NavItem>
      <NavItem eventKey={2} href="/search">
        Search
      </NavItem>
      <NavDropdown eventKey={3} title="Application" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} href="/invoice">
          Walk-In Application
        </MenuItem>
        {/* <MenuItem eventKey={3.2} href="/application/dealer">
          Dealer Application
        </MenuItem> */}
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Outstanding Client</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default NavbarInstance;
