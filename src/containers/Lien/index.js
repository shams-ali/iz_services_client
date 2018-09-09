import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { unsetModal } from 'react-redux-dialog';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { size, capitalize } from 'lodash';

import Form from '../../components/Form';
import forms from './questions'
import { apiRequest } from '../Invoice/actions';
import {
  selectApiRequestSuccess,
  selectApiRequestError,
} from '../Invoice/selectors';

class Lien extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { page: 0 };
  }
  componentWillReceiveProps({ success, error }) {
    const { actions } = this.props;
    if (error) {
      console.error(error.response);
      const { status } = error.response;
      if (status === 401) {
        actions.push('/login');
      }
    }
    if (success.status === 200 && success.data.type === 'application/pdf') {
      console.warn('success', success);
      actions.unsetModal();
      const url = window.URL.createObjectURL(new Blob([success.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'LienSaleComplete.pdf');
      document.body.appendChild(link);
      link.click();
      actions.push('/invoice');
    }
  }

  handleSubmit(data) {
    const { actions } = this.props;
    actions.apiRequest({
      responseType: 'blob',
      url: 'v1/lien',
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
      <div className="center">
        <h2>{capitalize(name)} Info</h2>
        <Form
          previousPage={page ? this.previousPage : null}
          onSubmit={
          page === size(forms) - 1
            ? this.handleSubmit
            : this.nextPage
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

Lien.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ apiRequest, unsetModal, push  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lien);
