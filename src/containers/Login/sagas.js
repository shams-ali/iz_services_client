import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getAuthSuccess, getAuthError } from './actions';
import { GET_AUTH } from './constants';

const fetchData = (url, data) =>
  axios
    .post(url, data)
    .then(({ data: authData }) => ({ authData }))
    .catch(error => ({ error }));

function* getAuth({ data }) {
  console.log(data, 'this is data');
  const { error, authData } = yield call(fetchData, '/v1/users/login', data);
  if (error) {
    yield put(getAuthError(error.message));
  } else {
    console.log('authData', authData);
    yield put(getAuthSuccess(authData));
  }
}

function* auth() {
  yield takeLatest(GET_AUTH, getAuth);
}

export default auth;
