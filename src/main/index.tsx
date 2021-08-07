import { lazy } from 'react';

import 'presentation/styles/global.scss';

import { Router } from 'presentation/router';
import { safeStorage } from 'infra/cache/local-storage-adapter';

const makeLogin = lazy(() => import('./factories/pages/Login'));

if (process.env.REACT_APP_NODE_ENV !== 'production') {
  window.safeStorage = safeStorage;
}

export function App(): JSX.Element {
  return <Router makeLogin={makeLogin} />;
}
