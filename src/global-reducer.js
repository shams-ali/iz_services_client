import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    authReducer
    // NOTE: put other app reducers here
  })
};

const createGlobalReducer = () =>
  combineReducers({
    ...containersReducer,
    form: formReducer,
    route: routerReducer
  });

export default createGlobalReducer;
