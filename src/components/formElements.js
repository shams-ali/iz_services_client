import React from 'react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RenderInputFields from './RenderInputFields';

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

        {formFields.map(({ type = 'text', select, name }) => (
          <div key={name}>
            <RenderInputFields type={type} name={name} select={select} />
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
