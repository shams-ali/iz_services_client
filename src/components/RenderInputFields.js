import React from 'react';
import { Field } from 'redux-form';
import { capitalize } from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import normalize from './normalize';

const RenderInputFields = ({ type, name, select, label }) => {
  if (type === 'date') {
    return (
      <Field
        name={name}
        format={null}
        floatingLabelText={capitalize(label || name)}
        component={DatePicker}
      />
    );
  }
  if (select) {
    return (
      <Field
        name={name}
        component={SelectField}
        hintText={capitalize(label || name)}
      >
        {select.map(menuItem => (
          <MenuItem key={menuItem} value={menuItem} primaryText={menuItem} />
        ))}
      </Field>
    );
  }
  return (
    <Field
      name={name}
      type={type}
      normalize={normalize[name]}
      floatingLabelText={capitalize(label || name)}
      hintText={capitalize(label || name)}
      component={TextField}
    />
  );
};

export default RenderInputFields;
