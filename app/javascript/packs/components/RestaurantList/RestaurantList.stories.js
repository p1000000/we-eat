import React from 'react';

import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import RestaurantList from './';

storiesOf('RestaurantList', module)
  .add('default', () => (
    <RestaurantList
      restaurants={object("restaurants", [  
        {  
           "name": "Oban Koban",
           "accepts_10bis": true,
           "address": "Ibn Gavirol 53, Tel Aviv",
           "coordinates": {  
              "lat": 30,
              "lng": 30
           },
           "max_delivery_time": 60,
           "cuisine": {  
              "name": "Asian",
              "icon": "I"
           },
           "reviews": [  
              {  
                 "name": "Monkey D Luffy",
                 "rating": 3,
                 "comment": "Awesome restaurant! Really amazing food, I want more"
              },
              {  
                "name": "Roronoa Zoro",
                "rating": 2,
                "comment": "Well, I guess the food was pretty good"
              }
           ]
        },
        {  
           "name": "Pepper Amsterdam",
           "accepts_10bis": true,
           "address": "Nehalat Izhak 102, Tel Aviv",
           "coordinates": {  
              "lat": 50,
              "lng": 60
           },
           "max_delivery_time": 65,
           "cuisine": {  
              "name": "Vegeterian",
              "icon": "2"
           },
           "reviews": []
        },
        {  
          "name": "BBB",
          "accepts_10bis": false,
          "address": "Katzanelson 30, Givatayim",
          "coordinates": {  
             "lat": 200,
             "lng": 500
          },
          "max_delivery_time": 45,
          "cuisine": {  
             "name": "Hamburgers",
             "icon": "3"
          },
          "reviews": [  
            {  
              "name": "Sanji Vinsmoke",
              "rating": 3,
              "comment": "Awesome burgers!!!"
            },
            {  
              "name": "Franky",
              "rating": 2,
              "comment": "OK burgers."
            }
          ]
       }
     ])}
    />
  ));
