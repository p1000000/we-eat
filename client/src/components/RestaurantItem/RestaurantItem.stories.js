import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, number, object, boolean } from '@storybook/addon-knobs';

import RestaurantItem from './';

storiesOf('RestaurantItem', module)
  .add('default', () => (
    <RestaurantItem
      icon={text("icon", "🍕")}
      name={text("name", "Oban Koban")}
      address={text("address", "Ibn Gavirol 53, Tel Aviv")}
      max_delivery_time={number("max_delivery_time", 60)}
      reviews={
        object("reviews", [  
          {  
             "name": "Monkey D Luffy",
             "rating": 5,
             "comment": "Awesome restaurant! Really amazing food, I want more"
          }
       ])
      }
      accepts_10bis={boolean("accepts_10bis", true)}
    />
  ));
