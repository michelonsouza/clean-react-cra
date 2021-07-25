import { RemoteAuthentication } from 'data/usecases';
import { AxiosHttpClient } from 'infra/http';
import { ValidationComposite } from 'validation/validation-composite';
import { ValidationBuilder } from 'validation/builder';
import { Login } from 'presentation/pages/Login';

export default function makeLogin(): JSX.Element {
  const url = `${process.env.REACT_APP_API_BASE_URL}/login`;
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
}
