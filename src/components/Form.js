import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { capitalize } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {
  renderTextField,
  renderFieldArray,
  renderSelectField
} from './formElements';
import validate from './Validate';

const Form = ({ lastPage, handleSubmit, fields, previousPage, formName }) => {
  return (
    <form onSubmit={handleSubmit}>
      {['fees', 'payments'].includes(formName) ? (
        <FieldArray
          name={formName}
          formName={formName}
          formFields={fields}
          component={renderFieldArray}
        />
      ) : (
        fields.map(({ type = 'text', name, select }) => (
          <div key={name}>
            {select ? (
              <Field
                name={name}
                component={renderSelectField}
                label={capitalize(name)}
              >
                {select.map(menuItem => (
                  <MenuItem value={menuItem} primaryText={menuItem} />
                ))}
              </Field>
            ) : (
              <Field
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
