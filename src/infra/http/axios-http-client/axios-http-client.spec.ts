import { mockPostRequestParams } from 'data/mocks';
import { mockAxios } from 'infra/mocks';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type MockAxiosResult = ReturnType<typeof mockAxios>;

type SutTypes = MockAxiosResult & {
  sut: AxiosHttpClient;
};

function makeSut(): SutTypes {
  const sut = new AxiosHttpClient();
  const { mockedAxios, mockedAxiosResult } = mockAxios();

  return {
    sut,
    mockedAxios,
    mockedAxiosResult,
  };
}

describe('AxiosHttpClient', () => {
  it('shoud call axios with correct URL and verb', async () => {
    const requestParams = mockPostRequestParams(false);
    const { sut, mockedAxios } = makeSut();
    await sut.post(requestParams);

    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, undefined);
  });

  it('shoud call axios with correct body', async () => {
    const requestParams = mockPostRequestParams();
    const { sut, mockedAxios } = makeSut();
    await sut.post(requestParams);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      requestParams.url,
      requestParams.body,
    );
  });

  it('shoud return the correct statusCode and body', async () => {
    const { sut, mockedAxiosResult } = makeSut();

    const httpResponse = await sut.post(mockPostRequestParams());
    const { status, data } = mockedAxiosResult;

    expect(httpResponse).toEqual({
      statusCode: status,
      body: data,
    });
  });
});
