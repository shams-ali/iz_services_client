import { fromJS } from 'immutable';

import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_ERROR,
  SET_INVOICE,
  SET_EDIT_FIELDS
} from './constants';

const initialState = fromJS({
  editFields: {},
  invoice: {},
  invoices: [],
  apiRequestLoading: null,
  apiRequestSuccess: [],
  apiRequestError: null
});

const { isArray } = Array;

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return state.set('apiRequestLoading', true).set('apiRequestError', null);
    case API_REQUEST_SUCCESS:
      return state
        .set('apiRequestLoading', false)
        .set('apiRequestSuccess', action.success)
        .set(
          'invoices',
          isArray(action.success.data)
            ? action.success.data
            : state.get('invoices')
        )
        .set('apiRequestError', null);
    case API_REQUEST_ERROR:
      return state
        .set('apiRequestLoading', false)
        .set('apiRequestSuccess', false)
        .set('apiRequestError', action.error);
    case SET_INVOICE:
      return state.set('invoice', action.invoice);
    case SET_EDIT_FIELDS:
      return state.set('editFields', action.fields);
    default:
      return state;
  }
};

export default invoiceReducer;
