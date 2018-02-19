import {
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_ERROR
} from './constants';

export const createInvoice = data => ({
  type: CREATE_INVOICE,
  data
});

export const createInvoiceSuccess = success => ({
  type: CREATE_INVOICE_SUCCESS,
  success
});

export const createInvoiceError = error => ({
  type: CREATE_INVOICE_ERROR,
  error
});
