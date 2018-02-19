import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { capitalize, size } from 'lodash';
import Form from './Form';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit, forms } = this.props;
    const { page } = this.state;
    const { name, fields } = forms[page];
    return (
      <div>
        <h2>{capitalize(name)} Info</h2>
        <Form
          previousPage={page ? this.previousPage : null}
          onSubmit={page === size(forms) - 1 ? onSubmit : this.nextPage}
          formName={name}
          fields={fields}
          key={name}
        />
      </div>
    );
  }
}

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired
};

export default FormContainer;
