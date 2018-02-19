import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { createInvoiceSuccess, createInvoiceError } from './actions';
import { CREATE_INVOICE } from './constants';

const postInvoice = (url, data) =>
  axios
    .post(url, data)
    .then(({ data: success }) => ({ success }))
    .catch(error => ({ error }));

function* createInvoice({ data }) {
  console.log(data, 'this is data');
  const { error, success } = yield call(postInvoice, '/v1/invoice', data);
  if (error) {
    console.log(error, 'this is error');
    yield put(createInvoiceError(error.message));
  } else {
    console.log('success', success);
    yield put(createInvoiceSuccess(success));
  }
}

function* invoice() {
  yield takeLatest(CREATE_INVOICE, createInvoice);
}

export default invoice;
