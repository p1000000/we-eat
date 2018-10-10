import React from 'react';

import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import ReviewList from './';

storiesOf('ReviewList', module)
  .add('default', () => (
    <ReviewList
      reviews={object("reviews", [  
        {  
           "name": "Monkey D Luffy",
           "rating": 5,
           "comment": "Awesome restaurant! Really amazing food, I want more"
        },
        {  
          "name": "Roronoa Zoro",
          "rating": 2,
          "comment": "Well, I guess the food was pretty good"
        }
     ])}
    />
  ));
