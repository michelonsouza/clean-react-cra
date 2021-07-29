import { Authentication } from 'domain/usecases';
import { RemoteAuthentication } from 'data/usecases';
import { makeAxiosHttpClient, makeApiUrl } from 'main/factories/http';

export function makeRemoteAuthentication(): Authentication {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
}
