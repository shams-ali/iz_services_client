import {
  GET_API_DATA,
  GET_API_DATA_LOADED,
  GET_API_DATA_ERROR
} from './constants';

export const getAPIData = data => ({
  type: GET_API_DATA,
  data
});

export const getAPIDataLoaded = data => ({
  type: GET_API_DATA_LOADED,
  data
});

export const getAPIDataError = error => ({
  type: GET_API_DATA_ERROR,
  error
});
