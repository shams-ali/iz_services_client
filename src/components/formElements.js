import React from 'react';
import { capitalize } from 'lodash';
import { Field } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { SelectField, TextField } from 'redux-form-material-ui';

const renderFieldArray = ({
  formFields,
  formName,
  fields,
  meta: { error, submitFailed }
}) => (
  <article>
    {fields.map((field, index) => (
      <section key={index}>
        <IconButton
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        >
          <NavigationClose />
          <h4>#{index + 1}</h4>
        </IconButton>

        {formFields.map(({ type = 'text', select, name, ...props }) => (
          <div key={name}>
            {select ? (
              <Field
                {...props}
                name={`${field}${name}`}
                component={SelectField}
                hintText={capitalize(name)}
              >
                {select.map(value => (
                  <MenuItem key={value} value={value} primaryText={value} />
                ))}
              </Field>
            ) : (
              <Field
                {...props}
                name={`${field}${name}`}
                type={type}
                component={TextField}
                hintText={capitalize(name)}
                floatingLabelText={capitalize(name)}
              />
            )}
          </div>
        ))}
      </section>
    ))}
    <FloatingActionButton type="button" onClick={() => fields.push({})}>
      <ContentAdd />
    </FloatingActionButton>
    {submitFailed && error && <span>{error}</span>}
  </article>
);

export default renderFieldArray;
