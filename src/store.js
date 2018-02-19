import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import createGlobalReducer from './global-reducer';
import globalSagas from './global-sagas';
import { reduxSearch } from 'redux-search';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware
];

const enhancer = compose(
  applyMiddleware(...middlewares),
  reduxSearch({
    resourceIndexes: {
      invoice: ['vin', 'name']
    },
    resourceSelector: (resourceName, state) => state[resourceName]
  })
);
const store = createStore(createGlobalReducer(), enhancer);

sagaMiddleware.run(globalSagas);

export default store;
