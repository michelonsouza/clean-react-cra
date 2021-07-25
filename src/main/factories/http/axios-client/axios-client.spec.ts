import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client';

import { makeAxiosHttpClient } from '.';

describe('AxiosClient', () => {
  test('shoud makeAxiosHttpClient returns an instance to AxiosHttpClient', () => {
    const axiosHttpClient = makeAxiosHttpClient();

    expect(axiosHttpClient).toBeInstanceOf(AxiosHttpClient);
  });
});
