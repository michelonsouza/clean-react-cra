import React from 'react';
import ReactDom from 'react-dom';

import { Login } from '@/presentation/pages';

ReactDom.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('main'),
);
