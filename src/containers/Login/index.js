import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAuth } from './actions';
import validate from './validate';
import { renderTextField } from '../../components/formElements';
import { selectAuth, selectAuthError } from './selectors';

let MaterialUiForm = props => {
  const {
    auth,
    authError,
    handleSubmit,
    pristine,
    reset,
    submitting,
    actions: { getAuth }
  } = props;

  if (auth && auth !== 'undefined') {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(getAuth)}>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
      <div>
        <Field
          name="password"
          component={renderTextField}
          label="Password"
          type="password"
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

const mapStateToProps = state => ({
  auth: selectAuth(state),
  authError: selectAuthError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAuth }, dispatch)
});

MaterialUiForm = reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncBlurFields: ['username']
})(MaterialUiForm);

export default connect(mapStateToProps, mapDispatchToProps)(MaterialUiForm);
