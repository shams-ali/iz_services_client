import React, { Component } from 'react';
import { without, omit } from 'lodash';
import { List, ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import moment from 'moment'
import Modal from './modal';
import InitializeFromStateForm from './InitializeFromStateForm';

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      icon: ['fa', 'fa-bars'],
      card: ['material-card', 'Red']
    };
    this.flipCard = this.flipCard.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }

  flipCard() {
    const { icon, flipped, card } = this.state;
    this.setState({ icon: icon.concat('fa-spin-fast') });
    if (flipped) {
      this.setState({ card: without(card, 'mc-active') });

      window.setTimeout(
        () =>
          this.setState({
            icon: without(icon, 'fa-arrow-left', 'fa-spin-fast').concat(
              'fa-bars'
            )
          }),
        800
      );
    } else {
      this.setState({ card: card.concat('mc-active') });

      window.setTimeout(
        () =>
          this.setState({
            icon: without(icon, 'fa-bars', 'fa-spin-fast').concat(
              'fa-arrow-left'
            )
          }),
        800
      );
    }

    this.setState({ flipped: !flipped });
  }

  openModal() {
    const { actions } = this.props;
    actions.setModal(Modal, {
      componentProps: {
        title: 'Confirm',
        open: true,
        onRequestClose: actions.unsetModal,
        handleSubmit: this.deleteInvoice,
        type: 'confirm',
        confirm: 'Are You sure You Want To Delete This Invoice?'
      },
      modalProps: { isOpen: true, style: { 'z-index': 10 } }
    });
  }

  handleEditItem({ _id, ...body }) {
    const { actions } = this.props;
    actions.apiRequest({
      method: 'put',
      url: `/v1/invoice/${_id}?type=invoice`,
      data: body
    });
  }

  openEditModal() {
    const { itemValues } = this.props;
    const {
      actions,
      forms: [{ fields: clientFields }, { fields: vehicleFields }]
    } = this.props;
    actions.setEditFields(omit(itemValues, ['fees', 'payments']));
    actions.setModal(InitializeFromStateForm, {
      componentProps: {
        fields: clientFields.concat(vehicleFields),
        onSubmit: this.handleEditItem,
        actions
      },
      modalProps: { isOpen: true, style: { 'z-index': 10 } }
    });
  }

  deleteInvoice() {
    const { actions, itemValues: { _id: id } } = this.props;
    actions.apiRequest({
      method: 'delete',
      url: `/v1/invoice/${id}`
    });
  }

  render() {
    const {
      itemValues: {
        name,
        make,
        dealer,
        vin,
        model_year: modelYear,
        phone,
        comments,
        case_type: caseType,
        case_status: caseStatus,
        _id: id,
        fees,
        payments,
        createdAt,
        updatedAt
      },
      actions: { push },
      getBalance,
      modalIsOpen
    } = this.props;
    const { flipped, icon, card } = this.state;
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <article className={card.join(' ')}>
          <h2 className={modalIsOpen ? 'modalIsActive' : ''}>
            <span>VIN: {vin}</span>
            <strong>
              <i className="fa fa-fw fa-star" />
              {`${make} ${modelYear}`}
            </strong>
          </h2>
          <div className="mc-content">
            {!flipped && (
              <List>
                <ListItem primaryText={`Customer: ${name || dealer || ''}`} />
                {phone && <ListItem primaryText={`Phone: ${phone}`} />}
                <ListItem
                  primaryText={`Balance: $${getBalance(fees, payments)}`}
                />
                {caseType && (
                  <ListItem primaryText={`Case Type: ${caseType}`} />
                )}
                {caseStatus && (
                  <ListItem primaryText={`Case Status: ${caseStatus}`} />
                )}
                <ListItem primaryText={`Created At: ${moment(createdAt).format('MMMM Do YYYY')}`} />
                <ListItem primaryText={`Updated At: ${moment(updatedAt).format('MMMM Do YYYY')}`} />
              </List>
            )}
            <div className="mc-description">{`Comments: ${comments}`}</div>
          </div>
          <button
            onClick={this.flipCard}
            className={`mc-btn-action ${modalIsOpen ? 'modalIsActive' : ''}`}
          >
            <i className={icon.join(' ')} />
          </button>
          <div className="mc-footer">
            {flipped && <h4>Action Items</h4>}
            <button
              className="fas fa-fw fa-check"
              onClick={() => push(`/invoice/${id}`)}
            />
            <button
              className="fas fa-fw fa-edit"
              onClick={this.openEditModal}
            />
            <button
              className="fas fa-fw fa-print"
              onClick={() => push(`/invoice/${id}/receipt`)}
            />
            <button className="fas fa-fw fa-trash" onClick={this.openModal} />
          </div>
        </article>
      </div>
    );
  }
}

CardItem.defaultProps = {
  itemValues: {},
  modalIsOpen: false
};

CardItem.propTypes = {
  itemValues: PropTypes.objectOf(PropTypes.any),
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  forms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  getBalance: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.objectOf(PropTypes.any)
};

export default CardItem;
