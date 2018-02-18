import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAPIData } from './actions';
import { selectApiData, selectApiDataError } from './selectors';

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
    this.props.actions.getAPIData({ email, password });

    // this.props.dispatch(authorize(email, password));
  }

  render() {
    const { apiDataError, token } = this.props;
    console.log(this.props, 'this is props');
    if (token && token !== 'undefined') {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {apiDataError && (
          <div style={{ color: 'red' }}>{apiDataError.message}</div>
        )}
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
  apiData: selectApiData(state),
  apiDataError: selectApiDataError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAPIData }, dispatch)
});
// const mapStateToProps = ({ containers: { authReducer } }) => authReducer;

// export default connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
