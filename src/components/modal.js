import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
      <div>
        {confirm}
        {error}
      </div>
    </Dialog>
  );
};

export default Modal;
