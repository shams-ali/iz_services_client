import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAuth } from './actions';
import { selectAuth, selectAuthError } from './selectors';

// import { getToken, getError } from './selectors';

// import { authorize } from './reducer';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const email = this.email.value;
    const password = this.password.value;
    this.props.actions.getAuth({ email, password });
  }

  render() {
    const { authError, auth } = this.props;
    console.log(this.props, 'this is props');
    console.log(auth, 'this is auth in login');
    if (auth && auth !== 'undefined') {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {authError && <div style={{ color: 'red' }}>{authError}</div>}
        <div>
          <input
            ref={_ref => (this.email = _ref)}
            type="text"
            placeholder="email"
          />
        </div>
        <div>
          <input
            ref={_ref => (this.password = _ref)}
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: selectAuth(state),
  authError: selectAuthError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAuth }, dispatch)
});
// const mapStateToProps = ({ containers: { authReducer } }) => authReducer;

// export default connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
