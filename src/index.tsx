import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './main';

import reportWebVitals from './reportWebVitals';

function renderApp(): void {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );

  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

export { renderApp };

renderApp();
