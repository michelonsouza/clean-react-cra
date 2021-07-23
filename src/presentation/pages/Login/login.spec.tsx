/* eslint-disable import/no-extraneous-dependencies */
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';

import 'jest-localstorage-mock';

import { InvalidCredentialsError } from 'domain/errors';
import {
  ValidationSpy,
  AuthenticationSpy,
  populateEmailField,
  populatePasswordField,
  testButtonIsDisabled,
  testElementExists,
  testElementText,
  testErrorWrapperChildCount,
  testStatusForField,
} from 'presentation/mocks';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({
  initialEntries: ['/login'],
});

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  validationSpy.errorMessage = params?.validationError || null;

  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>,
  );

  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
}

async function simulateValidSubmit(
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = sut.getByTestId('form') as HTMLFormElement;

  fireEvent.submit(form);

  await waitFor(() => form);
}

describe('LoginPage', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with initial state', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    testErrorWrapperChildCount(sut, 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'email', validationSpy.errorMessage as string);
    testStatusForField(sut, 'password', validationSpy.errorMessage as string);
  });

  it('should call email validation with correct value', () => {
    const email = faker.internet.email();
    const { sut, validationSpy } = makeSut();

    populateEmailField(sut, email);

    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual(email);
  });

  it('should call password validation with correct value', () => {
    const password = faker.internet.password();
    const { sut, validationSpy } = makeSut();

    populatePasswordField(sut, password);

    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual(password);
  });

  it('should show email error is validation failed', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    populateEmailField(sut);

    testStatusForField(sut, 'email', validationSpy.errorMessage as string);
  });

  it('should show password error is validation failed', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    populatePasswordField(sut);

    testStatusForField(sut, 'password', validationSpy.errorMessage as string);
  });

  it('should show valid email if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    testStatusForField(sut, 'email');
  });

  it('should show valid passoword if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);

    testStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    testButtonIsDisabled(sut, 'submit', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);

    testElementExists(sut, 'spinner');
  });

  it('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it('should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should presents error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);

    testErrorWrapperChildCount(sut, 1);
    testElementText(sut, 'main-error', error.message);
  });

  it('should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    const localStorageKey = `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}:accessToken`;

    await simulateValidSubmit(sut);

    expect(localStorage.setItem).toBeCalledWith(
      localStorageKey,
      authenticationSpy.account.accessToken,
    );

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to signup page', async () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
