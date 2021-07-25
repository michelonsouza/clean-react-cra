import { AxiosHttpClient } from 'infra/http';

export function makeAxiosHttpClient(): AxiosHttpClient {
  return new AxiosHttpClient();
}
