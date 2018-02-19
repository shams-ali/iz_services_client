import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import axios from 'axios';
// import emails from './mails';

const KEYS_TO_FILTERS = ['case_status', 'case_type', 'vin'];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      invoices: []
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.getInvoices = this.getInvoices.bind(this);
  }
  componentDidMount() {
    this.getInvoices();
  }

  getInvoices() {
    axios
      .get('/v1/invoice')
      .then(({ data: invoices }) => {
        console.log(invoices);
        this.setState({ invoices });
      })
      .catch(err => console.error(err));
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const filteredInvoices = this.state.invoices.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredInvoices.map(({ vin, _id, case_status, case_type }) => (
          <div className="mail" key={_id}>
            {<div className="from">{vin}</div>}
            {/* <div className="subject">{email.subject}</div> */}
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
