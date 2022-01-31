import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from './serviceWorkerRegistration';

const title = 'Corona PWA tracker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
registerServiceWorker();
module.hot.accept();
