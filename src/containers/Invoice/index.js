import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from 'react-redux-dialog';

import FormContainer from '../../components/FormContainer';
import Modal from '../../components/modal';
import forms from './questions';
import { selectInvoiceSuccess, selectInvoiceError } from './selectors';
import { createInvoice } from './actions';

class Invoice extends Component {
  componentWillReceiveProps({ success }) {
    const { actions: { setModal } } = this.props;
    setModal(Modal, {
      componentProps: { success },
      modalProps: { isOpen: !!success }
    });
  }
  render() {
    const { error, actions: { createInvoice } } = this.props;
    return (
      <div>
        <FormContainer onSubmit={createInvoice} forms={forms} />
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: selectInvoiceSuccess(state),
  error: selectInvoiceError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createInvoice, setModal }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
