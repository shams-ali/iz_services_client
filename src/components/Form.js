import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { capitalize } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField, renderFieldArray } from './formElements';
import validate from './Validate';

const Form = ({ handleSubmit, fields, previousPage, formName }) => {
  return (
    <form onSubmit={handleSubmit}>
      {['fee', 'payment'].includes(formName) ? (
        <FieldArray
          name={formName}
          formName={formName}
          formFields={fields}
          component={renderFieldArray}
        />
      ) : (
        fields.map(({ type = 'text', name, ...props }) => (
          <div key={name}>
            <Field
              {...props}
              name={name}
              type={type}
              component={renderTextField}
              label={capitalize(name)}
            />
          </div>
        ))
      )}

      {previousPage && (
        <RaisedButton
          label="Previous"
          type="button"
          onClick={previousPage}
          secondary
        />
      )}
      <RaisedButton label="Next" type="submit" primary />
    </form>
  );
};

export default reduxForm({
  form: 'form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Form);
