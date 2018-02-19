import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { unsetModal } from 'react-redux-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const Modal = ({ actions: { unsetModal, push } }) => {
  const close = () => {
    push('/');
    unsetModal();
  };
  return (
    <div>
      <div>Success!</div>
      <button onClick={close}>close</button>
    </div>
  );
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ unsetModal, push }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
