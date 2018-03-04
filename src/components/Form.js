import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import renderFieldArray from './formElements';
import validate from './Validate';
import RenderInputFields from './RenderInputFields';

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
            <RenderInputFields type={type} name={name} select={select} />
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
