import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import SearchBar from './';

storiesOf('SearchBar', module)
  .add('default', () => (
    <SearchBar
      
    />
  ));
