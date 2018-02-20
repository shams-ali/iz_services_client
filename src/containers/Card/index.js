import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import CardItem from '../../components/cardItem';
import './index.css';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const { items, filterBy, ...rest } = this.props;
    const { searchTerm } = this.state;
    return (
      <section className="card-container">
        <div className="page-header .center">
          <SearchInput className="search-input" onChange={this.searchUpdated} />
        </div>
        <div className="row active-with-click">
          {items
            .filter(createFilter(searchTerm, filterBy))
            .map(({ _id, ...itemValues }) => (
              <CardItem key={_id} id={_id} {...itemValues} {...rest} />
            ))}
        </div>
      </section>
    );
  }
}

export default CardContainer;
