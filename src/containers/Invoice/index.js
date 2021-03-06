import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import { find, reduce, omit } from 'lodash';
import WizardForm from '../../containers/WizardForm';
import Card from '../../containers/Card';
import Receipt from '../../containers/Receipt';
import Table from '../../components/Table';
import forms from './questions';
// import Modal from '../../components/modal';

import {
  selectApiRequestInvoices,
  selectApiRequestSuccess,
  selectApiRequestError,
  selectEditFields
} from './selectors';

import { apiRequest, setInvoice, setEditFields } from './actions';

const { assign } = Object;

const getFinalTotals = items =>
  items.reduce(
    (totals, item) =>
      assign(
        totals,
        reduce(
          omit(item, ['_id']),
          (subTotals, v, k) =>
            assign(subTotals, {
              [k]: (typeof v !== 'string' && totals[k] + v) || v
            }),
          totals
        )
      ),
    {}
  );

const getTotalDue = finalTotals =>
  reduce(
    finalTotals,
    (total, v, k) => {
      if (typeof v === 'string' || k === 'old_post_fee') {
        return total;
      }
      return total + v;
    },
    0
  );

const getBalance = (fees, payments) =>
  getTotalDue(getFinalTotals(fees)) - getTotalDue(getFinalTotals(payments));

class Invoice extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.unsetModal();
    actions.apiRequest({ method: 'get', url: `/v1/invoice` });
  }

  componentWillReceiveProps({ success, error }) {
    const { actions, match } = this.props;
    if (error) {
      console.error(error.response);
      const { status } = error.response;
      if (status === 401) {
        actions.push('/login');
      }
      // actions.setModal(Modal, {
      //   componentProps: {
      //     title: 'There was an error with your request',
      //     open: true,
      //     onRequestClose:
      //       status === 401 ? () => actions.push('/login') : actions.unsetModal,
      //     error: statusText
      //   },
      //   modalProps: { isOpen: true }
      // });
    }
    if ([201, 202, 204].includes(success.status)) {
      console.warn('success', success);
      actions.unsetModal();
      if (match.params.id === 'new') {
        actions.push(`/invoice/${success.data._id}/receipt`);
      }
      actions.apiRequest({
        method: 'get',
        url: '/v1/invoice'
      });
    }
  }

  render() {
    const {
      match: { params: { id, receipt } },
      invoices,
      actions,
      invoice,
      ...rest
    } = this.props;
    if (id === 'new') {
      return <WizardForm forms={forms} actions={actions} {...rest} />;
    } else if (receipt && id) {
      return (
        <Receipt
          getFinalTotals={getFinalTotals}
          invoice={find(invoices, { _id: id })}
        />
      );
    } else if (id) {
      return (
        <Table
          forms={forms}
          actions={actions}
          mainFields={['fees', 'payments']}
          invoice={find(invoices, { _id: id })}
          {...rest}
        />
      );
    }
    return (
      <Card
        actions={actions}
        items={invoices}
        forms={forms}
        getBalance={getBalance}
        filterBy={[
          'case_status',
          'case_type',
          'vin',
          'name',
          'dealer',
          'phone',
          'fees',
          'payments'
        ]}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  invoices: selectApiRequestInvoices(state),
  editFields: selectEditFields(state),
  success: selectApiRequestSuccess(state),
  error: selectApiRequestError(state),
  modalIsOpen: state.modal
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setModal, unsetModal, apiRequest, setEditFields, setInvoice, push },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
