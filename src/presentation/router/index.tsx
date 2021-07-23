import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

const Login = lazy(() => import('presentation/pages/Login'));

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<h4>Loading...</h4>}>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={() => <h1>Hello World</h1>} />
          <Redirect from="*" to="/" />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}
