import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setModal, unsetModal } from 'react-redux-dialog';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import Modal from './modal';

import { apiRequest } from '../containers/Invoice/actions';
import {
  selectApiRequestSuccess,
  selectApiRequestError
} from '../containers/Invoice/selectors';

class CardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hello world</div>;
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
