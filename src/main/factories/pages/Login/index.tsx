import { Login } from 'presentation/pages/Login';
import { makeRemoteAuthentication } from 'main/factories/usecases/authentication';

import { makeLoginValidation } from './login-validation-factory';

export default function makeLogin(): JSX.Element {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
}
