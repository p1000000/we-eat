import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import ListItem from '@material-ui/core/ListItem';

import ReactStars from 'react-stars';

import tenbis_logo from "../../images/10bis-logo.png";

const StyledListItem = styled(ListItem)`
  border-color: rgba(255,95,126,0.4) !important;
  &:last-child {
    border-color: rgba(255,95,126,1) !important;
  }
`;

const Header = styled("div")`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const Name = styled("div")`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
`;

const Comment = styled("div")`
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.46429em;
  width: 75%;
`;

const Image = styled("img")`
  width: 25px;
  margin-top: 4px;
`;

class RestaurantItem extends React.Component {
  state = {
    isOpen: false
  };

  _renderTenbis = accepts_10bis => {
    if (accepts_10bis) {
      return (
        <div>
          <Image src={tenbis_logo} />
        </div>
      );
    }
    return null;
  };

  _renderStars = (ratings) => (
    <div>
      <ReactStars
        count={5}
        value={ratings}
        edit={false}
        size={12}
        color2="#ff5f7e"
      />
    </div>
  );

  _renderReview = (name, rating) => {
    return (
      <Header>
        <Name>
          {name}
        </Name>
        {this._renderStars(rating)}
      </Header>
    );
  };

  _renderComment = (comment) => (
    <Comment>
      {comment}
    </Comment>
  );

  _renderListItem = () => {
    const { name, rating, comment } = this.props;
    return (
      <StyledListItem
        divider
      >
        {this._renderReview(name, rating)}
        {this._renderComment(comment)}
      </StyledListItem>
    );
  };

  _renderReviewItem = () => {
    return this._renderListItem();
  };

  render() {
    return this._renderReviewItem();
  }
};

RestaurantItem.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string
};

RestaurantItem.defaultProps = {
  name: "",
  rating: 0,
  comment: ""
};

export default RestaurantItem;