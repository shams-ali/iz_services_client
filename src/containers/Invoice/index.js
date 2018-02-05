import React from 'react';
import FormContainer from '../../components/FormContainer';
import forms from './questions';

const Invoice = () => {
  return (
    <div>
      <FormContainer onSubmit={() => console.log('SUBMITTING')} forms={forms} />
    </div>
  );
};

export default Invoice;
