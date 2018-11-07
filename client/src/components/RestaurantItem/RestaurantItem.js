import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddComment from '@material-ui/icons/AddComment';
import Button from '@material-ui/core/Button';

import ReactStars from 'react-stars';

import ReviewList from "../ReviewList";
import ReviewForm from "../ReviewForm";
import OrderForm from "../OrderForm/OrderForm";
import withTooltip from "../withTooltip";

import tenbis_logo from "../../images/10bis-logo.png";

const StyledListItem = styled(ListItem)`
  justify-content: space-between !important;
`;

const OrderdButton = styled("button")`
  color: rgb(55, 0, 0);
  display: flex;
  flex-direction: column;
  justifyContent: 'center',
  alignItems: 'center'
`;


const Details = styled("div")`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const Name = styled("div")`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
`;

const Address = styled("div")`
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.46429em;
`;

const Additional = styled("div")`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1.46429em;
  padding-top: 15px;
`;

const Image = styled("img")`
  width: 25px;
  margin-top: 4px;
`;

const NoReviews = styled("span")`
  color: #ff5f7e;
`;

const ExpandWrapper = styled("div")`
  cursor: pointer;
`;


const Buttons = styled("div")`
  display: flex;
  width: 125px;
  justify-content: space-between;
`;

const StyledAddComment = styled(AddComment)`
  cursor: pointer;
  color: #ff5f7e;
`;

const ModalContent = styled("div")`
  background: #fff;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
  &:focus {
    outline: none;
  }
`;

const Icon = styled("div")`
  font-size: 50px;
  flex: 1;
  margin-right: 20px;
`;

const Content = styled("div")`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  flex: 10;
`;

class RestaurantItem extends React.Component {
  state = {
    isOpen: false,
    reviewFormOpen: false,
    orderFormOpen: false
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

  _renderStars = (ratings) => {
    if (ratings.length) {
      return withTooltip(
        (
          <div>
            <ReactStars
              count={5}
              value={ratings.reduce((acc, rating) =>  acc + (rating / ratings.length), 0)}
              edit={false}
              size={12}
              color2="#ff5f7e"
            />
          </div>
        ), `${ratings.length} ${ratings.length > 1 ? "reviews" : "review"}`
      );
    }
    return (
      <NoReviews>
        No Reviews Yet
      </NoReviews>
    );
  };

  _renderAdditionalData = (max_delivery_time, reviews, accepts_10bis) => {
    return (
      <Additional>
        <div>
          {`~ ${max_delivery_time} Minutes`}
        </div>
        {this._renderTenbis(accepts_10bis)}
        {this._renderStars(reviews.map(review => review.rating))}
      </Additional>
    );
  };

  _renderDetails = (name, address, max_delivery_time, reviews, accepts_10bis) => {
    return (
      <Details>
        <Name>
          {name}
        </Name>
        <Address>
          {address}
        </Address>
        {this._renderAdditionalData(max_delivery_time, reviews, accepts_10bis)}
      </Details>
    );
  };

  _onClick = () => {
    if (this.props.reviews.length) {
      this.setState(({ isOpen }) => ({
        isOpen: !isOpen
      }));
    }
  };

  _renderExpand = (numOfReviews) => {
    if (numOfReviews > 0) {
      const expand = this.state.isOpen ? <ExpandLess /> : <ExpandMore />;
      return withTooltip(
        (
          (
            <ExpandWrapper
              onClick={this._onClick}
            >
              {expand}
            </ExpandWrapper>
          )
        ), "View Reviews"
      );
    };
    return null;
  };

  _toggleReviewModal = () => this.setState(({ reviewFormOpen }) => ({
    reviewFormOpen: !reviewFormOpen
  }));

  _toggleOrderModal = () => this.setState(({ orderFormOpen }) => ({
      orderFormOpen: !orderFormOpen
  }));

  _onSelect = () => {
    this.props.onSelect(this.props.coordinates);
  };

  _renderButtons = (reviews) => {
    if (!this.props.compact) {
      return (
        <Buttons>
          {withTooltip(
              <OrderdButton variant="contained" onClick={this._toggleOrderModal}> ORDER </OrderdButton>
          , "ORDER")}
          {withTooltip(
            (
              <StyledAddComment
                onClick={this._toggleReviewModal}
              />
            ), "Add Review"
          )}
          {this._renderExpand(reviews.length)}
        </Buttons>
      );
    }
  };

  _renderIcon = icon => (
    <Icon>
      {icon}
    </Icon>
  );

  _renderListItem = () => {
    const { icon, name, address, max_delivery_time, reviews, accepts_10bis } = this.props;
    return (
      <StyledListItem
          divider={!this.state.isOpen && !this.props.compact}
          button={!this.props.compact}
          onClick={this._onSelect}
      >
        {this._renderIcon(icon)}
        <Content>
          {this._renderDetails(name, address, max_delivery_time, reviews, accepts_10bis)}
          {this._renderButtons(reviews)}
        </Content>
      </StyledListItem>
    );
  };

  _renderReviews = () => {
    const { reviews } = this.props;
    return (
      <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
        <ReviewList
          reviews={reviews}
        />
      </Collapse>
    );
  };

  _onSubmit = (review) => {
    this.props.addReview({
      ...review,
      restaurant_id: this.props.id
    });
    this._toggleReviewModal();
  };

  _onOrder = (customer_name) => {
      this._toggleOrderModal();
      this.props.createOrder(this.props.name, customer_name);
  };

  _renderReviewFormModal = () => (
    <Modal
      open={this.state.reviewFormOpen}
      onClose={this._toggleReviewModal}
    >
      <ModalContent>
        <ReviewForm
          restaurantName={this.props.name}
          onSubmit={this._onSubmit}
          onCancel={this._toggleReviewModal}
        />
      </ModalContent>
    </Modal>
  );

  _renderOrderFormModal = () => (
    <Modal
      open={this.state.orderFormOpen}
      onClose={this._toggleOrderModal}
    >
      <ModalContent>
        <OrderForm
          restaurantName={this.props.name}
          onOrder={this._onOrder}
          onCancel={this._toggleOrderModal}
        />
      </ModalContent>
    </Modal>
  );

  _renderRestaurantItem = () => {
    return (
      <div>
        {this._renderListItem()}
        {this._renderReviews()}
        {this._renderReviewFormModal()}
        {this._renderOrderFormModal()}
      </div>
    );
  };

  render() {
    return this._renderRestaurantItem();
  }
};

RestaurantItem.propTypes = {
  id: PropTypes.number,
  icon: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  max_delivery_time: PropTypes.number,
  reviews: PropTypes.array,
  accepts_10bis: PropTypes.bool,
  coordinates: PropTypes.object,
  addReview: PropTypes.func,
  createOrder: PropTypes.func,
  onSelect: PropTypes.func,
  compact: PropTypes.bool
};

RestaurantItem.defaultProps = {
  id: undefined,
  icon: "",
  name: "",
  address: "",
  max_delivery_time: 0,
  reviews: [],
  accepts_10bis: false,
  coordinates: {},
  addReview: () => {},
  createOrder: () => {},
  onSelect: () => {},
  compact: false
};

export default RestaurantItem;