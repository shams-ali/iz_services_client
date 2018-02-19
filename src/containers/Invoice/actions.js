import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_ERROR
} from './constants';

export const apiRequest = data => ({
  type: API_REQUEST,
  data
});

export const apiRequestSuccess = success => ({
  type: API_REQUEST_SUCCESS,
  success
});

export const apiRequestError = error => ({
  type: API_REQUEST_ERROR,
  error
});
