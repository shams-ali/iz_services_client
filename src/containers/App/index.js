import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAPIData } from './actions';
import { selectApiData } from './selectors';

const getMyIp = apiData =>
  apiData && apiData.origin && apiData.origin.split(', ')[1];

class App extends Component {
  componentWillMount() {
    this.props.actions.getAPIData();
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to the Registration Invoice Generator</h2>
        </div>
        <p className="app-intro">
          To get started, click on Application in the navbar.
        </p>
        <p className="app-intro">Your IP is: {getMyIp(this.props.apiData)}</p>
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
  apiData: {}
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  apiData: PropTypes.object
};

const mapStateToProps = state => ({
  apiData: selectApiData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAPIData }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
