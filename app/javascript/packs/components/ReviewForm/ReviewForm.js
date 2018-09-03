import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ReactStars from 'react-stars';

const Title = styled("div")`
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5em;
  margin: 10px 0 !important;
`;

const Form = styled("form")`

`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0 !important;
`;

const StyledButton = styled(Button)`
  margin: 15px 0 0 !important;
  height: 50px;
  color: ${({ type }) => type === "submit" ? "#ff5f7e" : "#2196f3"} !important;
`;

const StyledInputLabel = styled(InputLabel)`
  margin: 10px 0 !important;
`;

const Rating = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 !important;
`;

const StyledReactStars = styled(ReactStars)`
  margin: 7px 10px 0;
`;

class AddReview extends React.Component {
  state = {
    fields: {
      name: "",
      comment: "",
      rating: 0
    },
    noRatingError: false
  };

  handleChange = (field) => (e) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: e.target.value
      }
    });
  };

  _handleRating = (rating) => this.setState(({ fields }) => ({
    fields: {
      ...fields,
      rating
    },
    noRatingError: false
  }));

  _renderStars = (ratings) => (
    <Rating>
       <StyledInputLabel
        required
        error={this.state.noRatingError}
      >
        Rating
      </StyledInputLabel>
      <StyledReactStars
        count={5}
        size={15}
        value={this.state.fields.rating}
        onChange={this._handleRating}
        half={false}
        color2="#ff5f7e"
      />
    </Rating>
  );

  _onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.fields.rating) {
      this.setState({
        noRatingError: true
      });
    } else {
      this.props.onSubmit(this.state.fields);
    }
  };

  _onCancel = () => {
    this.props.onCancel();
  };

  _renderAddReview = () => (
    <div>
      <Form
        onSubmit={this._onSubmit}
      >
        <Content>
          <Title>
            {`Add your review for ${this.props.restaurantName}`}
          </Title>
          <StyledTextField
            label="Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            required
          />
          <StyledTextField
            label="Comment"
            value={this.state.comment}
            onChange={this.handleChange("comment")}
            multiline
            required
          />
          {this._renderStars()}
          <StyledButton
            type="submit"
          >
            Add Review
          </StyledButton>
          <StyledButton
            onClick={this._onCancel}
          >
            Cancel
          </StyledButton>
        </Content>
      </Form>
    </div>
  );

  render() {
    return this._renderAddReview();
  }
};

AddReview.propTypes = {
  restaurantName: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

AddReview.defaultProps = {
  restaurantName: "",
  onSubmit: () => {},
  onCancel: () => {}
};

export default AddReview;