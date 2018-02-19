import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAPIData } from './actions';
import { selectApiData } from './selectors';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to the Registration Invoice Generator</h2>
        </div>
        <p className="app-intro">
          To get started, click on Application in the navbar.
        </p>
      </div>
    );
  }
}

export default App;
