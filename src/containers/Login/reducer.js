import { fromJS } from 'immutable';

import {
  LOG_OUT,
  GET_AUTH,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR
} from './constants';

const initialState = fromJS({
  auth: {},
  authLoading: null,
  authSuccess: null,
  authError: null
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      console.log('logging out');
      localStorage.removeItem('auth');
      return state
        .set('auth', {})
        .set('authLoading', null)
        .set('authSuccess', null)
        .set('authError', null);
    case GET_AUTH:
      return state.set('authLoading', true).set('authError', null);
    case GET_AUTH_SUCCESS:
      console.log(action.data, 'this is data');
      localStorage.setItem('auth', JSON.stringify(action.data));
      return state
        .set('auth', action.data)
        .set('authLoading', false)
        .set('authSuccess', true)
        .set('authError', null);
    case GET_AUTH_ERROR:
      localStorage.removeItem('auth');
      return state
        .set('auth', {})
        .set('authLoading', false)
        .set('authSuccess', false)
        .set('authError', action.error);
    default:
      return state;
  }
};

export default authReducer;
