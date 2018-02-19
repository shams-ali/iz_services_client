import React, { Component } from 'react';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';

class cardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      icon: ['fa', 'fa-bars'],
      card: ['material-card', 'Red']
    };
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    console.log('flipping card');
    console.log('this.id', this.props.id);
    const { icon, flipped, card } = this.state;
    this.setState({ icon: icon.concat('fa-spin-fast') });
    if (flipped) {
      this.setState({ card: _.without(card, 'mc-active') });

      window.setTimeout(
        () =>
          this.setState({
            icon: _.without(icon, 'fa-arrow-left', 'fa-spin-fast').concat(
              'fa-bars'
            )
          }),
        800
      );
    } else {
      this.setState({ card: card.concat('mc-active') });

      window.setTimeout(
        () =>
          this.setState({
            icon: _.without(icon, 'fa-bars', 'fa-spin-fast').concat(
              'fa-arrow-left'
            )
          }),
        800
      );
    }

    this.setState({ flipped: !flipped });
  }

  render() {
    const { name, dealer, vin, year, notes = 'No Notes' } = this.props;
    console.log('this.props', this.props);
    const { flipped, icon, card } = this.state;
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <article className={card.join(' ')}>
          <h2>
            <span>{vin}</span>
            <strong>
              <i className="fa fa-fw fa-star" />
              {year}
            </strong>
          </h2>
          <div className="mc-content">
            {!flipped && (
              <List>
                <ListItem primaryText={`Customer: ${name || dealer}`} />
                <ListItem primaryText={`Balance: 100$`} />
              </List>
            )}
            <div className="mc-description">{notes}</div>
          </div>
          <button onClick={this.flipCard} className="mc-btn-action">
            <i className={icon.join(' ')} />
          </button>
          <div className="mc-footer">
            {flipped && <h4>Action Items</h4>}
            <a className="fas fa-fw fa-check" />
            <a className="fas fa-fw fa-edit" />
            <a className="fas fa-fw fa-print" />
            <a className="fas fa-fw fa-trash" />
          </div>
        </article>
      </div>
    );
  }
}

export default cardItem;
