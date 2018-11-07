import React from 'react';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

storiesOf('OrderForm', module)
    .add('default', () => (
        <OrderForm
            restaurantName={text("restaurantName", "Oban Koban")}
        />
    ));
