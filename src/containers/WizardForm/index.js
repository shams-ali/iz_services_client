import React, { Component } from 'react';
import { capitalize, size, sum, omit } from 'lodash';
import Form from '../../components/Form';

const { values } = Object;
class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      page: 0,
      totalFees: 0,
      totalPayments: 0,
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
        (total, fee) =>
          total +
          sum(
            values(omit(fee, ['old_post_fee', 'extra_discount'])).map(
              num => +num
            )
          ) -
          (+fee['extra_discount'] || 0),
        0
      );
      const totalPayments = payments.reduce(
        (total, { amount }) => total + +amount,
        0
      );
      this.setState({
        totalFees,
        totalPayments,
        calculate: true
      });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page, totalFees, totalPayments, calculate } = this.state;
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
          resetTotal={() =>
            this.setState({ totalFees: 0, totalPayments: 0, calculate: false })
          }
          fields={fields}
          lastPage={page === size(forms) - 1}
          key={name}
          calculate={calculate}
        />
        {page === size(forms) - 1 && (
          <div>
            <p>Total fees ${totalFees}</p>
            <p>Total payments ${totalPayments}</p>
            <p>Total due ${totalFees - totalPayments}</p>
          </div>
        )}
      </div>
    );
  }
}

export default WizardForm;
