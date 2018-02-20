import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import CardItem from '../../components/cardItem';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  componentDidMount() {
    const { type, actions } = this.props;
    actions.apiRequest({
      method: 'get',
      url: `/v1/${type}`
    });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const { items, filterBy, ...rest } = this.props;
    const { searchTerm } = this.state;
    return (
      <section className="container">
        <div className="page-header">
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
