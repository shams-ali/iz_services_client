export const selectLoginContainer = state => state.containers.authReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectApiData = state =>
  selectLoginContainer(state).get('apiData');
export const selectApiDataError = state =>
  selectLoginContainer(state).get('apiDataError');
