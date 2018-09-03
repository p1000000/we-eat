import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default (component, title) => (
  <Tooltip
    title={title}
  >
    {component}
  </Tooltip>
);;