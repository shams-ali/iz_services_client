import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { size } from 'lodash';
import Form from './Form';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    console.warn('hello world', this.state);
    const { onSubmit, forms } = this.props;
    const { page } = this.state;
    return (
      <div>
        <Form
          previousPage={page === 1 ? null : this.previousPage}
          onSubmit={page === size(forms) ? onSubmit : this.nextPage}
          formName={forms[page - 1].name}
          fields={forms[page - 1].fields}
          key={forms[page - 1].name}
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
