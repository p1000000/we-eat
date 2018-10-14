import React from 'react';

import { storiesOf } from '@storybook/react';

import Hamburger from './';

storiesOf('Hamburger', module)
  .add('default', () => (
    <Hamburger />
  ));
