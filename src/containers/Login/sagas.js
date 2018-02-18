import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getAPIDataLoaded, getAPIDataError } from './actions';
import { GET_API_DATA } from './constants';

const fetchData = (url, data) =>
  axios
    .post(url, data)
    .then(result => ({ result }))
    .catch(error => ({ error }));

function* getApiData({ data }) {
  const { error, result } = yield call(fetchData, '/v1', data);
  if (error) {
    yield put(getAPIDataError(error));
  }
  console.log(result, 'this is result');
  yield put(getAPIDataLoaded(result));
}

function* apiData() {
  yield takeLatest(GET_API_DATA, getApiData);
}

export default apiData;
