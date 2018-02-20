import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import WizardForm from '../../containers/WizardForm';
import Card from '../../containers/Card';

import Modal from '../../components/modal';
import {
  selectApiRequestInvoices,
  selectApiRequestSuccess,
  selectApiRequestError
} from './selectors';

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
      actions.push('/invoice');
    }
  }
  render() {
    const { match, invoices } = this.props;
    console.log(match);
    if (match.params.id === 'new') {
      return <WizardForm />;
    } else if (match.params.id) {
      return <div>render card details component here</div>;
    }
    return (
      <Card
        items={invoices}
        const
        filterBy={['case_status', 'case_type', 'vin', 'name']}
        type={'invoice'}
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
  actions: bindActionCreators({ setModal, unsetModal, push }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
