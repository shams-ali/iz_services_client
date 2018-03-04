import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { capitalize } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, DatePicker } from 'redux-form-material-ui';
import InputMask from 'react-input-mask';
import renderFieldArray from './formElements';
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
        fields.map(({ type = 'text', name }) => (
          <div key={name}>
            <Field
              name={name}
              // type={type}
              floatingLabelText={capitalize(name)}
              format={null}
              hintText={
                ['date', 'tel', 'year'].includes(type) ? null : capitalize(name)
              }
              component={type === 'date' ? DatePicker : TextField}
            >
              {['tel', 'year'].includes(type) && (
                <InputMask
                  mask={type === 'tel' ? '(1) 999 999 9999' : '9999'}
                  maskChar=" "
                />
              )}
            </Field>
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
