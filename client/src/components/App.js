import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import Restaurants from "../containers/Restaurants";

// import Vegan from '../../public/fonts/vegan.ttf';


injectGlobal`
  @font-face {
    font-family: 'vegan';
    src: ${process.env.PUBLIC_URL + '/fonts/vegan.ttf'};
  }
  body {
    font-family: 'Lato', 'Helvetica Neue', sans-serif;
  }
`;

export default () => (
  <div>
    <Restaurants />
  </div>
);