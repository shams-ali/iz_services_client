import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { apiRequestSuccess, apiRequestError } from './actions';
import { API_REQUEST } from './constants';

const initializeApiRequest = config =>
  axios(config)
    .then(success => ({ success }))
    .catch(error => ({ error }));

function* apiRequest({ config }) {
  const { error, success } = yield call(initializeApiRequest, config);
  console.log(success, 'this is res in sagas');
  if (error) {
    yield put(apiRequestError(error.message));
  } else {
    yield put(apiRequestSuccess(success));
  }
}

function* invoice() {
  yield takeLatest(API_REQUEST, apiRequest);
}

export default invoice;
