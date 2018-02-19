import React, { Component } from 'react';
import { capitalize } from 'lodash';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

export const renderField = ({
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

export class renderFieldArray extends Component {
  componentDidMount() {
    this.props.fields.push();
  }
  render() {
    const {
      formFields,
      formName,
      fields,
      meta: { error, submitFailed }
    } = this.props;
    return (
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

            {formFields.map(({ type = 'text', name, ...props }) => (
              <div key={name}>
                <Field
                  {...props}
                  name={`${field}name`}
                  type={type}
                  component={renderTextField}
                  label={capitalize(name)}
                />
              </div>
            ))}
          </section>
        ))}
        <button type="button" onClick={() => fields.push({})}>
          Add A {formName}
        </button>
        {submitFailed && error && <span>{error}</span>}
      </article>
    );
  }
}
