import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Login = lazy(() => import('presentation/pages/Login'));

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<h4>Loading...</h4>}>
          <Route path="/login" component={Login} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}
