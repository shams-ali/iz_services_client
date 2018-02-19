import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { capitalize } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import {
  renderTextField,
  renderFieldArray,
  renderSelectField
} from './formElements';
import validate from './Validate';
import MenuItem from 'material-ui/MenuItem';

const Form = ({ lastPage, handleSubmit, fields, previousPage, formName }) => {
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
        fields.map(({ type = 'text', name, select, ...props }) => (
          <div key={name}>
            {select ? (
              <Field
                {...props}
                name={name}
                component={renderSelectField}
                label={capitalize(name)}
              >
                {select.map(value => (
                  <MenuItem value={value} primaryText={value} />
                ))}
              </Field>
            ) : (
              <Field
                {...props}
                name={name}
                type={type}
                component={renderTextField}
                label={capitalize(name)}
              />
            )}
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
      <RaisedButton
        label={lastPage ? 'Finish' : 'Next'}
        type="submit"
        primary
      />
    </form>
  );
};

export default reduxForm({
  form: 'form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Form);
