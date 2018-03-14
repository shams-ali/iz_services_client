import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { apiRequestSuccess, apiRequestError } from './actions';
import { API_REQUEST } from './constants';

const { assign } = Object;
const initializeApiRequest = config =>
  axios(config)
    .then(success => ({ success }))
    .catch(error => ({ error }));

function* apiRequest({ config }) {
  const { token } = JSON.parse(localStorage.getItem('auth'));

  const { error, success } = yield call(
    initializeApiRequest,
    assign(config, { headers: { Authorization: token } })
  );

  if (error) {
    yield put(apiRequestError(error));
  } else {
    yield put(apiRequestSuccess(success));
  }
}

function* invoiceSagas() {
  yield takeLatest(API_REQUEST, apiRequest);
}

export default invoiceSagas;
