import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import renderFieldArray from './formElements';
import validate from './Validate';
import RenderInputFields from './RenderInputFields';

const Form = ({
  lastPage,
  handleSubmit,
  fields,
  previousPage,
  formName,
  calculate,
  resetTotal
}) => (
  <form onSubmit={handleSubmit}>
    {['fees', 'payments', 'REGISTERED OWNER', 'LEGAL OWNER', 'INTERESTED PARTIES'].includes(formName) ? (
      <FieldArray
        name={formName}
        formName={formName}
        formFields={fields}
        component={renderFieldArray}
      />
    ) : (
      fields.map(({ type = 'text', name, select, label }) => (
        <div key={name}>
          <RenderInputFields
            type={type}
            name={name}
            label={label}
            select={select}
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
    {!lastPage && <RaisedButton label="Next" type="submit" primary />}
    {lastPage &&
      calculate && (
        <div>
          <RaisedButton
            label="Reset"
            type="button"
            primary
            onClick={resetTotal}
          />
          <RaisedButton label="Finish" type="submit" primary />
        </div>
      )}
    {lastPage &&
      !calculate && <RaisedButton label="calculate" type="submit" primary />}
  </form>
);

export default reduxForm({
  form: 'form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Form);
