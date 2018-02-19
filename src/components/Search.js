import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import axios from 'axios';
import CardItem from './cardItem';
import { List, ListItem } from 'material-ui/List';

const KEYS_TO_FILTERS = ['case_status', 'case_type', 'vin', 'name'];

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
      <section className="container">
        <div className="page-header">
          <SearchInput className="search-input" onChange={this.searchUpdated} />
        </div>
        <div className="row active-with-click">
          {filteredInvoices.map(({ _id, ...props }) => (
            <CardItem key={_id} id={_id} {...props} />
          ))}
        </div>
      </section>
    );
  }
}

export default Search;
