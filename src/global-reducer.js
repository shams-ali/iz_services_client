import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'react-redux-dialog';
import { routerReducer as router } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';
import invoiceReducer from './containers/Invoice/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    authReducer,
    invoiceReducer
    // NOTE: put other app reducers here
  })
};

const createGlobalReducer = () =>
  combineReducers({
    ...containersReducer,
    form,
    router,
    modal
  });

export default createGlobalReducer;
