import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import PropTypes from 'prop-types';
import { capitalize, size } from 'lodash';
import Form from '../../components/Form';
import forms from './questions';
import Modal from '../../components/modal';
import {
  selectApiRequestSuccess,
  selectApiRequestError
} from '../Invoice/selectors';
import { apiRequest } from '../Invoice/actions';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0
    };
  }

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

  handleSubmit(data) {
    const { actions } = this.props;
    actions.postInvoice({
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
    const { name, fields } = forms[page];
    return (
      <div>
        <h2>{capitalize(name)} Info</h2>
        <Form
          previousPage={page ? this.previousPage : null}
          onSubmit={page === size(forms) - 1 ? this.onSubmit : this.nextPage}
          formName={name}
          fields={fields}
          lastPage={page === size(forms) - 1}
          key={name}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
