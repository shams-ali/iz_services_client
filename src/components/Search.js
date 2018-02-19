import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CardItem from './cardItem';
import {
  selectApiRequestSuccess,
  selectApiRequestError
} from '../containers/Invoice/selectors';
import { apiRequest } from '../containers/Invoice/actions';

const filterBy = ['case_status', 'case_type', 'vin', 'name'];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  componentDidMount() {
    this.props.actions.apiRequest({
      method: 'get',
      url: '/v1/invoice'
    });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const { invoices } = this.props;
    const { searchTerm } = this.state;

    return (
      <section className="container">
        <div className="page-header">
          <SearchInput className="search-input" onChange={this.searchUpdated} />
        </div>
        <div className="row active-with-click">
          {invoices
            .filter(createFilter(searchTerm, filterBy))
            .map(({ _id, ...props }) => (
              <CardItem key={_id} id={_id} {...props} />
            ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  invoices: selectApiRequestSuccess(state),
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ apiRequest }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
