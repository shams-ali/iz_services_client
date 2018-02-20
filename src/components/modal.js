import React from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { unsetModal } from 'react-redux-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Modal = ({ error, handleSubmit, onRequestClose, confirm, ...props }) => {
  const actions = [
    <FlatButton label="Cancel" primary onClick={onRequestClose} />,
    <FlatButton label="Submit" primary keyboardFocused onClick={handleSubmit} />
  ];

  return (
    <Dialog
      onRequestClose={onRequestClose}
      actions={confirm ? actions : actions.slice(0, -1)}
      {...props}
    >
      {confirm}
    </Dialog>
  );
};

export default Modal;
