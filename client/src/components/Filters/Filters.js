import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/lab/Slider';

import ReactStars from 'react-stars';

import tenbis_logo from "../../images/10bis-logo.png";

const FilterWrapper = styled("div")`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
`;

const SliderWrapper = styled("div")`
  height: 42px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckboxWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCheckbox = styled(Checkbox)`
  height: 35px !important;
`;

const Image = styled("img")`
  width: 40px;
`;

class Filters extends React.Component {
  _getMaxDeliveryTimeLabel = () => {
    const maxDeliveryTime = this.props.max_delivery_time;
    let result = "Max delivery time";
    if (maxDeliveryTime > 0) {
      result += `: ${maxDeliveryTime} Minutes`;
    }
    return result;
  };

  render() {
    return (
      <FilterWrapper>
        <Select
          value={this.props.sort.sortBy}
          onChange={this.props.sort.onSort}
          displayEmpty
          name="Sort"
          autoWidth
        >
          <MenuItem value="">
            Sort By
          </MenuItem>
          <MenuItem value="name">
            Name
          </MenuItem>
          <MenuItem value="rating">
            Rating
          </MenuItem>
          <MenuItem value="max_delivery_time">
            Max Delivery Time
          </MenuItem>
        </Select>
        <Select
          value={this.props.cuisine}
          onChange={this.props.onChange("cuisine")}
          displayEmpty
          name="Cuisine"
          autoWidth
        >
          <MenuItem value="">
            Cuisine
          </MenuItem>
          {
            this.props.cuisines.map(({ name, icon }) => (
              <MenuItem
                key={name}
                value={name}
              >
                {`${icon} ${name}`}
              </MenuItem>
            ))
          }
        </Select>
        <SliderWrapper>
          <Typography>
            {this._getMaxDeliveryTimeLabel()}
          </Typography>
          <Slider
            value={this.props.max_delivery_time}
            onChange={this.props.onChange("max_delivery_time")}
            min={0}
            max={120}
            step={1}
          />
        </SliderWrapper>
        <StarWrapper>
          <Typography>
            Rating
          </Typography>
          <ReactStars
            count={5}
            value={this.props.rating}
            onChange={this.props.onChange("rating")}
            size={15}
            color2="#ff5f7e"
          />
        </StarWrapper>
        <CheckboxWrapper>
          <Image
            src={tenbis_logo}
          />
          <StyledCheckbox
            checked={this.props.accepts_10bis}
            onChange={this.props.onChange("accepts_10bis")}
          />
        </CheckboxWrapper>
      </FilterWrapper>
    );
  }
};

Filters.propTypes = {
  
};

Filters.defaultProps = {
  
};

export default Filters;