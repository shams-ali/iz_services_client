import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import WizardForm from '../../containers/WizardForm';
import Card from '../../containers/Card';
import forms from './questions';

import Modal from '../../components/modal';
import {
  selectApiRequestInvoices,
  selectApiRequestSuccess,
  selectApiRequestError
} from './selectors';
import { apiRequest } from './actions';

class Invoice extends Component {
  componentWillReceiveProps({ success, error }) {
    const { actions } = this.props;
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
    if ([201, 204].includes(success.status)) {
      console.log('this is status', success.status);
      actions.unsetModal();
      actions.apiRequest({
        method: 'get',
        url: '/v1/invoice'
      });
      actions.push('/invoice');
    }
  }
  render() {
    const { match, invoices, ...rest } = this.props;
    if (match.params.id === 'new') {
      return <WizardForm forms={forms} {...rest} />;
    } else if (match.params.id) {
      return <div>render card details component here</div>;
    }
    return (
      <Card
        items={invoices}
        filterBy={['case_status', 'case_type', 'vin', 'name']}
        type={'invoice'}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  invoices: selectApiRequestInvoices(state),
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setModal, unsetModal, apiRequest, push },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
