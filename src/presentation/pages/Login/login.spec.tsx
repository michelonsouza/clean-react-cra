import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';

import 'jest-localstorage-mock';

import { InvalidCredentialsError } from 'domain/errors';
import { ValidationSpy, AuthenticationSpy } from 'presentation/mocks';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  validationSpy.errorMessage = params?.validationError || null;

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />,
  );

  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
}

function populateEmailField(
  sut: RenderResult,
  email = faker.internet.email(),
): HTMLInputElement {
  const emailInput = sut.getByTestId('email-input') as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });

  return emailInput;
}

function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password(),
): HTMLInputElement {
  const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
  fireEvent.blur(passwordInput);

  return passwordInput;
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

function simulateStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void {
  const status = sut.getByTestId(`${fieldName}-status`);

  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
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
    const errorWrapper = sut.getByTestId('error-wrapper');
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, 'email', validationSpy.errorMessage as string);

    simulateStatusForField(
      sut,
      'password',
      validationSpy.errorMessage as string,
    );
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

    simulateStatusForField(sut, 'email', validationSpy.errorMessage as string);
  });

  it('should show password error is validation failed', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    populatePasswordField(sut);

    simulateStatusForField(
      sut,
      'password',
      validationSpy.errorMessage as string,
    );
  });

  it('should show valid email if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    simulateStatusForField(sut, 'email');
  });

  it('should show valid passoword if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);

    simulateStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getAllByTestId('spinner');

    expect(spinner).toBeTruthy();
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

  it('should not call authentication if form is invalid', () => {
    const { sut, authenticationSpy } = makeSut({
      validationError: faker.random.words(7),
    });

    populateEmailField(sut);

    const form = sut.getByTestId('form') as HTMLFormElement;

    fireEvent.submit(form);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should presents error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);

    const mainError = sut.getByTestId('main-error');
    const errorWrapper = sut.getByTestId('error-wrapper');

    expect(mainError.textContent).toBe(error.message);
    expect(errorWrapper.childElementCount).toBe(1);
  });

  it('should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);

    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
  });
});
