import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Filters from './';

storiesOf('Filters', module)
  .add('default', () => (
    <Filters
      
    />
  ));
