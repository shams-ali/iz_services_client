import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAuth } from './actions';
import validate from './validate';
import { TextField } from 'redux-form-material-ui';
import { selectAuth, selectAuthError } from './selectors';

let Login = props => {
  const {
    auth,
    authError,
    handleSubmit,
    pristine,
    reset,
    submitting,
    actions: { getAuth }
  } = props;

  if (auth && auth.token) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(getAuth)}>
      <div>
        <Field
          name="username"
          component={TextField}
          floatingLabelText="Username"
          hintText="Username"
        />
      </div>
      <div>
        <Field
          name="password"
          component={TextField}
          label="Password"
          type="password"
          floatingLabelText="Password"
          hintText="Password"
        />
      </div>
      {authError && <strong>{authError}</strong>}

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    auth: selectAuth(state),
    authError: selectAuthError(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAuth }, dispatch)
});

Login = reduxForm({
  form: 'Login', // a unique identifier for this form
  validate,
  asyncBlurFields: ['username']
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
