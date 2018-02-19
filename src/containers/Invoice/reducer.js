import { fromJS } from 'immutable';

import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_ERROR
} from './constants';

const initialState = fromJS({
  apiRequestLoading: null,
  apiRequestSuccess: null,
  apiRequestError: null
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return state.set('apiRequestLoading', true).set('apiRequestError', null);
    case API_REQUEST_SUCCESS:
      return state
        .set('apiRequestLoading', false)
        .set('apiRequestSuccess', action.success)
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
