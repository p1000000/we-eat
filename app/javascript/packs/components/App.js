import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import Restaurants from "../containers/Restaurants";

import Vegan from '../../../assets/fonts/vegan.ttf';

injectGlobal`
  @font-face {
    font-family: 'vegan';
    src: url(${Vegan});
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