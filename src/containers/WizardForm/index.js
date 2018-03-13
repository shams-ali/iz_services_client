import React, { Component } from 'react';
import { capitalize, size } from 'lodash';
import Form from '../../components/Form';
import { sum } from 'lodash';

const { values } = Object;
class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      page: 0,
      total: 0,
      calculate: false
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

  nextPage(v) {
    const { payments = [], fees = [] } = v;
    const { page } = this.state;
    const { forms } = this.props;
    if (page === size(forms) - 1) {
      const totalFees = fees.reduce(
        (total, fee) => total + sum(values(fee).map(num => +num)),
        0
      );
      const totalPayments = payments.reduce(
        (total, { amount }) => total + amount,
        0
      );
      this.setState({ total: totalFees - totalPayments, calculate: true });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  }

  previousPage(v) {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page, total, calculate } = this.state;
    const { forms } = this.props;
    const { name, fields } = forms[page];
    return (
      <div className="center">
        <h2>{capitalize(name)} Info</h2>
        <Form
          previousPage={page ? this.previousPage : null}
          onSubmit={
            page === size(forms) - 1 && calculate
              ? this.handleSubmit
              : this.nextPage
          }
          formName={name}
          resetTotal={() => this.setState({ total: 0, calculate: false })}
          fields={fields}
          lastPage={page === size(forms) - 1}
          key={name}
          calculate={calculate}
        />
        {['fees', 'payments'].includes(name) && <p>Total due ${total}</p>}
      </div>
    );
  }
}

export default WizardForm;
