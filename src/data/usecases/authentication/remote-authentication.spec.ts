import faker from 'faker';

import { mockAuthenticationParams, mockAccountModel } from 'domain/mocks';
import { AccountModel } from 'domain/models';
import { InvalidCredentialsError, UnexpectedError } from 'domain/errors';
import { AuthenticationParams } from 'domain/usecases';
import { HttpPostClientSpy } from 'data/mocks';
import { HttpStatusCode } from 'data/protocols';

import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
}

describe('RemoteAuthentication', () => {
  it('shoud call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthenticationParams());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('shoud call HttpPostClient with correct body', async () => {
    const authenticationParams = mockAuthenticationParams();
    const { httpPostClientSpy, sut } = makeSut();

    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it('shoud return an AccountModel if HttpPostClient return 200', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const response = await sut.auth(mockAuthenticationParams());

    expect(response).toEqual(httpResult);
  });

  it('shoud throw UnexpectedError if HttPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badrequest,
    };

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('shoud throw InvalidCredentialsError if HttPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('shoud throw UnexpectedError if HttPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('shoud throw UnexpectedError if HttPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});

export {};
