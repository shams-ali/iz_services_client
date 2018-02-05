import React from 'react';

const renderField = ({
  input,
  label,
  maxLength,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} maxLength={maxLength} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
