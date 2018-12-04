import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from '@material-ui/core/List';

import RestaurantItem from "../RestaurantItem"

const NoRestaurants = styled("div")`
  padding-top: 30px;
  text-align: center;
  opacity: 0.4;
`;

class RestaurantList extends React.Component {
  _renderListItems = () => {
    const { restaurants } = this.props;
    if (!restaurants.length) {
      return (
        <NoRestaurants>
          No Restaurants found
        </NoRestaurants>
      );
    }
    return restaurants.map(restaurant => {
      return (
        <RestaurantItem
          key={`${restaurant.id}-${restaurant.name}`}
          icon={restaurant.cuisine.icon}
          {...restaurant}
          addReview={this.props.addReview}
          createOrder={this.props.createOrder}
          onSelect={this.props.onSelect}
        />
      );
    });
  };

  _renderRestaurantList = () => (
    <List>
      {this._renderListItems()}
    </List>
  );

  render() {
    return this._renderRestaurantList();
  }
};

RestaurantList.propTypes = {
  restaurants: PropTypes.array,
  toggleReviewModal: PropTypes.func,
  addReview: PropTypes.func,
  onSelect: PropTypes.func
};

RestaurantList.defaultProps = {
  restaurants: [],
  toggleReviewModal: () => {},
  addReview: () => {},
  onSelect: () => {}
};

export default RestaurantList;