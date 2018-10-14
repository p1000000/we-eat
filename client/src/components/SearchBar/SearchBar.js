import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const StyledTextField = styled(TextField)`
  background: #fff;
  border-radius: 5px;
  padding: 10px 20px !important;
  width: 100%;
`;

const SearchBar = ({ onChange, value }) => (
  <StyledTextField
    type="search"
    margin="normal"
    placeholder="Find a Restaurant"
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search
            color="disabled"
          />
        </InputAdornment>
      ),
      disableUnderline: true
    }}
  />
);

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

SearchBar.defaultProps = {
  value: "",
  onChange: () => {}
};

export default SearchBar;