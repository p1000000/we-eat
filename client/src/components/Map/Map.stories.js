import React from 'react';

import { storiesOf } from '@storybook/react';

import Map from './';

storiesOf('Map', module)
  .add('default', () => (
    <Map />
  ));
