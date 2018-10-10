import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LineItem = styled("div")`

`;

class Example extends React.Component {
  render() {
    return (
      <LineItem>
        <div>
          Bla
        </div>
        <div>
          Blu
        </div>
      </LineItem>
    );
  }
};

Example.propTypes = {
  
};

Example.defaultProps = {
  
};

export default Example;