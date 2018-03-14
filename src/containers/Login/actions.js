import {
  GET_AUTH,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  LOG_OUT
} from './constants';

export const getAuth = data => ({
  type: GET_AUTH,
  data
});

export const logOut = () => ({
  type: LOG_OUT
});

export const getAuthSuccess = data => ({
  type: GET_AUTH_SUCCESS,
  data
});

export const getAuthError = error => ({
  type: GET_AUTH_ERROR,
  error
});
