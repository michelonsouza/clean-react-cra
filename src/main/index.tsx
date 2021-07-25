import { lazy } from 'react';

import 'presentation/styles/global.scss';

import { Router } from 'presentation/router';

const makeLogin = lazy(() => import('./factories/pages/Login'));

export function App(): JSX.Element {
  return <Router makeLogin={makeLogin} />;
}
