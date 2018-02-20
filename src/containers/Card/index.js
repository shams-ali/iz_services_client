import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { first } from 'lodash';
import CardItem from '../../components/cardItem';
import { selectApiRequestError } from '../../containers/Invoice/selectors';
import { apiRequest } from '../../containers/Invoice/actions';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
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
    const { items, filterBy } = this.props;
    const { searchTerm } = this.state;
    return (
      <section className="container">
        <div className="page-header">
          <SearchInput className="search-input" onChange={this.searchUpdated} />
        </div>
        <div className="row active-with-click">
          {items
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
  error: selectApiRequestError(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ apiRequest }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
