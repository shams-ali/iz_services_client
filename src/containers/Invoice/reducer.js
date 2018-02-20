import { fromJS } from 'immutable';

import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_ERROR
} from './constants';

const initialState = fromJS({
  invoices: [],
  apiRequestLoading: null,
  apiRequestSuccess: [],
  apiRequestError: null
});

const { isArray } = Array;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return state.set('apiRequestLoading', true).set('apiRequestError', null);
    case API_REQUEST_SUCCESS:
      console.log('this is state', state);
      return state
        .set('apiRequestLoading', false)
        .set('apiRequestSuccess', action.success)
        .set(
          'invoices',
          isArray(action.success) ? action.success : state.get('invoices')
        )
        .set('apiRequestError', null);
    case API_REQUEST_ERROR:
      return state
        .set('apiRequestLoading', false)
        .set('apiRequestSuccess', false)
        .set('apiRequestError', action.error);
    default:
      return state;
  }
};

export default authReducer;
