import { fromJS } from 'immutable';

import { GET_AUTH, GET_AUTH_SUCCESS, GET_AUTH_ERROR } from './constants';

const initialState = fromJS({
  auth: null,
  authLoading: null,
  authSuccess: null,
  authError: null
});

const authReducer = (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case GET_AUTH:
      return state.set('authLoading', true).set('authError', null);
    case GET_AUTH_SUCCESS:
      return state
        .set('auth', action.data)
        .set('authLoading', false)
        .set('authSuccess', true)
        .set('authError', null);
    case GET_AUTH_ERROR:
      return state
        .set('auth', null)
        .set('authLoading', false)
        .set('authSuccess', false)
        .set('authError', action.error);
    default:
      return state;
  }
};

export default authReducer;
