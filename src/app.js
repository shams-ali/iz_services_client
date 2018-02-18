import React from 'react';
// import { Route } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';

// import { history } from './store';

// import Login from './containers/Login';
// import App from './containers/App';
// import Invoice from './containers/Invoice';
import Header from './containers/Header';

// const Routes = () => (
//   <ConnectedRouter history={history}>
//     <div>
//       <Route path="/login" component={Login} />
//       <IndexRoute exact path="/" component={App}>
//         <Route path="/invoice" component={Invoice} />
//       </IndexRoute>
//     </div>
//   </ConnectedRouter>
// );
// export default Routes;

import Main from './main';

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

export default App;
