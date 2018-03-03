import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import { find, pick } from 'lodash';
import WizardForm from '../../containers/WizardForm';
import Card from '../../containers/Card';
import Table from '../../components/Table';
import forms from './questions';

import Modal from '../../components/modal';
import {
  selectApiRequestInvoices,
  selectApiRequestSuccess,
  selectApiRequestError,
  selectInvoice,
  selectEditFields
} from './selectors';
import { apiRequest, setInvoice, setEditFields } from './actions';

class Invoice extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.unsetModal();
    actions.apiRequest({ method: 'get', url: `/v1/invoice` });
  }

  componentWillReceiveProps({ success, error }) {
    const { actions, match } = this.props;
    if (error) {
      actions.setModal(Modal, {
        componentProps: {
          title: error.message || 'There was an error with your request',
          open: true,
          onRequestClose: actions.unsetModal,
          error
        },
        modalProps: { isOpen: true }
      });
    }
    if ([201, 202, 204].includes(success.status)) {
      actions.unsetModal();
      if (match.params.id === 'new') {
        actions.push('/invoice');
      }
      actions.apiRequest({
        method: 'get',
        url: '/v1/invoice'
      });
    }
  }

  render() {
    const {
      match: { params: { id } },
      invoices,
      actions,
      invoice,
      ...rest
    } = this.props;
    if (id === 'new') {
      return <WizardForm forms={forms} actions={actions} {...rest} />;
    } else if (id) {
      actions.setInvoice(find(invoices, { _id: id }));
      return (
        <Table
          forms={forms}
          actions={actions}
          mainFields={pick(invoice, ['fees', 'payments'])}
          invoice={invoice}
          {...rest}
        />
      );
    }
    return (
      <Card
        actions={actions}
        items={invoices}
        filterBy={['case_status', 'case_type', 'vin', 'name']}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  invoices: selectApiRequestInvoices(state),
  editFields: selectEditFields(state),
  invoice: selectInvoice(state),
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setModal, unsetModal, apiRequest, setEditFields, setInvoice, push },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
