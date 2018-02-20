import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Modal from './modal';

import { apiRequest } from '../containers/Invoice/actions';
import {
  selectApiRequestSuccess,
  selectApiRequestError
} from '../containers/Invoice/selectors';

const { isArray } = Array;

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
    this.closeModal = this.closeModal.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }
  componentWillReceiveProps({ error, success }) {
    const { actions } = this.props;
    if (error) {
      actions.setModal(Modal, {
        componentProps: {
          title: 'wassap',
          open: true,
          onRequestClose: actions.unsetModal,
          error
        },
        modalProps: { isOpen: true }
      });
    }
    if (success.status === 204) {
      actions.unsetModal();
      actions.push('/');
    }
  }

  flipCard() {
    const { icon, flipped, card } = this.state;
    this.setState({ icon: icon.concat('fa-spin-fast') });
    if (flipped) {
      this.setState({ card: _.without(card, 'mc-active') });

      window.setTimeout(
        () =>
          this.setState({
            icon: _.without(icon, 'fa-arrow-left', 'fa-spin-fast').concat(
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
            icon: _.without(icon, 'fa-bars', 'fa-spin-fast').concat(
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

  deleteInvoice() {
    const { actions, id } = this.props;
    actions.apiRequest({
      method: 'delete',
      url: `v1/invoice/${id}`
    });
  }

  render() {
    const {
      name = '',
      dealer = '',
      vin = '',
      year = '',
      notes = '',
      openModal,
      id
    } = this.props;
    const { flipped, icon, card } = this.state;
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <article className={card.join(' ')}>
          <h2>
            <span>{vin}</span>
            <strong>
              <i className="fa fa-fw fa-star" />
              {year}
            </strong>
          </h2>
          <div className="mc-content">
            {!flipped && (
              <List>
                <ListItem primaryText={`Customer: ${name || dealer}`} />
                <ListItem primaryText={`Balance: 100$`} />
              </List>
            )}
            <div className="mc-description">{`Notes: ${notes}`}</div>
          </div>
          <button onClick={this.flipCard} className="mc-btn-action">
            <i className={icon.join(' ')} />
          </button>
          <div className="mc-footer">
            {flipped && <h4>Action Items</h4>}
            <a className="fas fa-fw fa-check" />
            <a className="fas fa-fw fa-edit" />
            <a className="fas fa-fw fa-print" />
            <a className="fas fa-fw fa-trash" onClick={this.openModal} />
          </div>
        </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
