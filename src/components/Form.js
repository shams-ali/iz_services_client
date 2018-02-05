import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './Validate';
import renderField from './RenderField';
import { capitalize } from 'lodash';

const Form = ({ handleSubmit, fields }) => {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ type = 'text', name }) => (
        <Field
          name={name}
          type={type}
          component={renderField}
          label={capitalize(name)}
          key={name}
        />
      ))}
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Form);
