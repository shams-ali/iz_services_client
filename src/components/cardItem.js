import React, { Component } from 'react';
import { without, omit } from 'lodash';
import { List, ListItem } from 'material-ui/List';
import Modal from './modal';
import InitializeFromStateForm from './InitializeFromStateForm';

const { assign } = Object;
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
      modalProps: { isOpen: true }
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
        fields: assign(clientFields, vehicleFields),
        onSubmit: this.handleEditItem,
        actions
      },
      modalProps: { isOpen: true }
    });
  }

  deleteInvoice() {
    const { actions, itemValues: { _id: id } } = this.props;
    actions.apiRequest({
      method: 'delete',
      url: `v1/invoice/${id}`
    });
  }

  render() {
    const {
      itemValues: { name, make, dealer, vin, model_year, comments, _id: id }
    } = this.props;
    const { flipped, icon, card } = this.state;
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <article className={card.join(' ')}>
          <h2>
            <span>{vin}</span>
            <strong>
              <i className="fa fa-fw fa-star" />
              {`${make} ${model_year}`}
            </strong>
          </h2>
          <div className="mc-content">
            {!flipped && (
              <List>
                <ListItem primaryText={`Customer: ${name || dealer}`} />
                <ListItem primaryText={`Balance: 100$`} />
              </List>
            )}
            <div className="mc-description">{`Comments: ${comments}`}</div>
          </div>
          <button onClick={this.flipCard} className="mc-btn-action">
            <i className={icon.join(' ')} />
          </button>
          <div className="mc-footer">
            {flipped && <h4>Action Items</h4>}
            <a className="fas fa-fw fa-check" href={`/invoice/${id}`} />
            <a className="fas fa-fw fa-edit" onClick={this.openEditModal} />
            <a className="fas fa-fw fa-print" />
            <a className="fas fa-fw fa-trash" onClick={this.openModal} />
          </div>
        </article>
      </div>
    );
  }
}

export default CardItem;
