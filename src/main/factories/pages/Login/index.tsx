import { Login } from 'presentation/pages/Login';
import { makeRemoteAuthentication } from 'main/factories/usecases/authentication';
import { makeLocalSaveAccessToken } from 'main/factories/usecases/save-access-token';

import { makeLoginValidation } from './login-validation-factory';

export default function makeLogin(): JSX.Element {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}
