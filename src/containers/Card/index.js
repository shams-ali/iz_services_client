import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import CardItem from '../../components/cardItem';
import Switch from '@material-ui/core/Switch';

import './index.css';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      balanceOnly: false
    };
  }

  searchUpdated = searchTerm => this.setState({ searchTerm });
  
  handleChange = name => event => this.setState({ [name]: event.target.checked });

  render() {
    const { items, filterBy, getBalance, ...rest } = this.props;
    const { searchTerm, balanceOnly } = this.state;
    console.log(items, 'this is items')
    return (
      <section className="card-container">
        <div className="page-header .center">
          <SearchInput className="search-input" onChange={this.searchUpdated} />
          <Switch
            checked={balanceOnly}
            onChange={this.handleChange('balanceOnly')}
            value="balanceOnly"
          />
        </div>
        <div className="row active-with-click">
          {items
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .filter(({fees, payments}) => !balanceOnly || getBalance(fees, payments) > 0)
            .filter(createFilter(searchTerm, filterBy))
            .map(itemValues => (
              <CardItem
                key={itemValues._id}
                itemValues={itemValues}
                getBalance={getBalance}
                {...rest}
              />
            ))}
        </div>
      </section>
    );
  }
}

export default CardContainer;
