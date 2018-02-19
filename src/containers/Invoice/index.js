import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from 'react-redux-dialog';

import FormContainer from '../../components/FormContainer';
import Modal from '../../components/modal';
import forms from './questions';
import { selectApiRequestSuccess, selectApiRequestError } from './selectors';
import { apiRequest } from './actions';

class Invoice extends Component {
  componentWillReceiveProps({ success }) {
    const { actions: { setModal } } = this.props;
    setModal(Modal, {
      componentProps: { success },
      modalProps: { isOpen: !!success }
    });
  }
  render() {
    const { error, actions: { apiRequest: postInvoice } } = this.props;
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
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ apiRequest, setModal }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
