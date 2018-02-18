export const selectLoginContainer = state => state.containers.authReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectAuth = state => selectLoginContainer(state).get('auth');

export const selectAuthError = state => {
  selectLoginContainer(state).get('authError');
};
