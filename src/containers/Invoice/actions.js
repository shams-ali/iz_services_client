import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_ERROR,
  SET_INVOICE,
  SET_EDIT_FIELDS
} from './constants';

export const apiRequest = config => ({
  type: API_REQUEST,
  config
});

export const apiRequestSuccess = success => ({
  type: API_REQUEST_SUCCESS,
  success
});

export const apiRequestError = error => ({
  type: API_REQUEST_ERROR,
  error
});

export const setInvoice = invoice => {
  return {
    type: SET_INVOICE,
    invoice
  };
};

export const setEditFields = fields => {
  return {
    type: SET_EDIT_FIELDS,
    fields
  };
};
