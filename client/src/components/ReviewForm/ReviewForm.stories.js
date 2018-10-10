import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ReviewForm from './';

storiesOf('ReviewForm', module)
  .add('default', () => (
    <ReviewForm
      restaurantName={text("restaurantName", "Oban Koban")}
    />
  ));
