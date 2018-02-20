import React, { Component } from 'react';
import { capitalize, size } from 'lodash';
import Form from '../../components/Form';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      page: 0
    };
  }

  handleSubmit(data) {
    const { actions } = this.props;
    actions.apiRequest({
      url: '/v1/invoice',
      method: 'post',
      data
    });
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    const { forms } = this.props;
    const { name, fields } = forms[page];
    return (
      <div>
        <h2>{capitalize(name)} Info</h2>
        <Form
          previousPage={page ? this.previousPage : null}
          onSubmit={
            page === size(forms) - 1 ? this.handleSubmit : this.nextPage
          }
          formName={name}
          fields={fields}
          lastPage={page === size(forms) - 1}
          key={name}
        />
      </div>
    );
  }
}

export default WizardForm;
