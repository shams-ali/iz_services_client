import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';

import FormContainer from '../../components/FormContainer';
import Modal from '../../components/modal';
import forms from './questions';
import { selectApiRequestSuccess, selectApiRequestError } from './selectors';
import { apiRequest } from './actions';

class Invoice extends Component {
  componentWillReceiveProps({ success, error }) {
    const { actions } = this.props;
    if (error || success.status !== 201) {
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
    if (success.status === 201) {
      actions.push('/');
    }
  }
  render() {
    const { actions: { apiRequest: postInvoice } } = this.props;
    return (
      <div>
        <FormContainer
          onSubmit={data =>
            postInvoice({
              url: '/v1/invoice',
              method: 'post',
              data
            })
          }
          forms={forms}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { apiRequest, setModal, unsetModal, push },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
