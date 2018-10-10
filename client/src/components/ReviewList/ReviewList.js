import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from '@material-ui/core/List';

import ReviewItem from "../ReviewItem"

const Title = styled("div")`
  color: #ff5f7e;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  padding-left: 24px;
`;

const ListItems = styled("div")`
  padding: 0 20px;
`;

class ReviewList extends React.Component {
  _renderListItems = () => this.props.reviews.map(review => {
    return (
      <ReviewItem
        key={review.id}
        {...review}
      />
    );
  });

  _renderReviewList = () => (
    <List>
      <Title>Reviews</Title>
      <ListItems>
        {this._renderListItems()}
      </ListItems>
    </List>
  );

  render() {
    return this._renderReviewList();
  }
};

ReviewList.propTypes = {
  reviews: PropTypes.array
};

ReviewList.defaultProps = {
  reviews: []
};

export default ReviewList;