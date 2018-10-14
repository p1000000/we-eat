import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from "styled-components";

import App from "./components/App";

injectGlobal`
  body {
    margin: 0;
  }
`;

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.body.appendChild(document.createElement('div')),
    )
})


// import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();
