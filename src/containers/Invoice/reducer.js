import { fromJS } from 'immutable';

import {
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_ERROR
} from './constants';

const initialState = fromJS({
  createInvoiceLoading: null,
  createInvoiceSuccess: null,
  createInvoiceError: null
});

const authReducer = (state = initialState, action) => {
  console.log(action, 'this is action');
  switch (action.type) {
    case CREATE_INVOICE:
      return state
        .set('createInvoiceLoading', true)
        .set('createInvoiceError', null);
    case CREATE_INVOICE_SUCCESS:
      return state
        .set('createInvoiceLoading', false)
        .set('createInvoiceSuccess', action.success)
        .set('createInvoiceError', null);
    case CREATE_INVOICE_ERROR:
      return state
        .set('createInvoiceLoading', false)
        .set('createInvoiceSuccess', false)
        .set('createInvoiceError', action.error);
    default:
      return state;
  }
};

export default authReducer;
