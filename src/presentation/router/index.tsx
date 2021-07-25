import { useEffect, Suspense, LazyExoticComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { disableDevtools } from 'presentation/utils';

interface RouterProps {
  makeLogin: LazyExoticComponent<any>;
}

export function Router({ makeLogin }: RouterProps): JSX.Element {
  useEffect(() => {
    disableDevtools();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<h4>Loading...</h4>}>
          <Route path="/" exact component={() => <h1>Hello World</h1>} />
          <Route path="/login" component={makeLogin} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}
