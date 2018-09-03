import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import ReviewItem from './';

storiesOf('ReviewItem', module)
  .add('default', () => (
    <ReviewItem
      name={text("name", "Monkey D Luffy")}
      rating={number("rating", 3)}
      comment={text("comment", "Awesome restaurant! Really amazing food, I want more")}
    />
  ));
