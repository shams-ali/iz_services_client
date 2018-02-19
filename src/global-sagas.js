import { fork, all } from 'redux-saga/effects';

import appSagas from './containers/App/sagas';
import loginSagas from './containers/Login/sagas';
import invoiceSagas from './containers/Invoice/sagas';

const sagas = [
  appSagas,
  loginSagas,
  invoiceSagas
  // NOTE: put other app sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map(saga => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
