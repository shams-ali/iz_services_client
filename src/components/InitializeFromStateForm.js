import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { selectEditFields } from '../containers/Invoice/selectors';
import validate from './Validate';
import RenderInputFields from './RenderInputFields';

const Form = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  fields,
  actions,
  deleteItem,
  initialValues
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ type = 'text', name, select }) => (
        <div key={name}>
          <RenderInputFields type={type} name={name} select={select} />
        </div>
      ))}
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
        {deleteItem && (
          <button type="button" onClick={() => deleteItem(initialValues)}>
            delete
          </button>
        )}
        <button type="button" onClick={actions.unsetModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
export default connect(
  state => ({
    initialValues: selectEditFields(state) // pull initial values from account reducer
  }) // bind account loading action creator
)(
  reduxForm({
    form: 'initializeFromState', // a unique identifier for this form
    destroyOnUnmount: true, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(Form)
);
