import React from 'react';
import { withRouter } from 'react-router-dom';
import { ModalContainer } from 'react-redux-dialog';

import Header from '../Header';

const Layout = ({ children }) => (
  <div>
    <ModalContainer />
    <Header />
    <main>{children}</main>
  </div>
);

export default withRouter(Layout);
