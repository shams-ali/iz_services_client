import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { apiRequestSuccess, apiRequestError } from './actions';
import { API_REQUEST } from './constants';

const initializeApiRequest = (url, data) =>
  axios
    .post(url, data)
    .then(({ data: success }) => ({ success }))
    .catch(error => ({ error }));

function* apiRequest({ data }) {
  const { error, success } = yield call(
    initializeApiRequest,
    '/v1/invoice',
    data
  );
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
