import React from 'react';
import { Field } from 'redux-form';
import { capitalize } from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import normalize from './normalize';

const RenderInputFields = ({ type, name, select }) => {
  if (type === 'date') {
    return (
      <Field
        name={name}
        format={null}
        floatingLabelText={capitalize(name)}
        component={DatePicker}
      />
    );
  }
  if (select) {
    return (
      <Field name={name} component={SelectField} hintText={capitalize(name)}>
        {select.map(menuItem => (
          <MenuItem value={menuItem} primaryText={menuItem} />
        ))}
      </Field>
    );
  }
  return (
    <Field
      name={name}
      type={type}
      normalize={normalize[name]}
      floatingLabelText={capitalize(name)}
      hintText={capitalize(name)}
      component={TextField}
    />
  );
};

export default RenderInputFields;
